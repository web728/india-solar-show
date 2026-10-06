import { connectDB } from "@/lib/db";

import {
  transporter,
  DEFAULT_ADMIN_EMAILS,
} from "@/lib/email";

import {
  appendToExcel,
} from "@/lib/excelSheet";

import type {
  EmailConfig,
  SheetConfig,
} from "@/lib/types";

/* =========================================================
   CONFIG
========================================================= */

const SPREADSHEET_ID =
  process.env.GOOGLE_SHEET_ID ?? "";

const WEBSITE_NAME =
  "India International Solar Show";

const WEBSITE_SOURCE =
  "India International Solar Show Website";

/* =========================================================
   TYPES
========================================================= */

type FormDocument<T> =
  T & {
    createdAt: Date;

    _id?: {
      toString(): string;
    };
  };

export interface SubmitFormResult<
  T,
> {
  doc: FormDocument<T>;

  integrations: {
    mongo: true;

    email:
      | "success"
      | "failed";

    sheet:
      | "success"
      | "failed"
      | "skipped";
  };
}

/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(
  value: unknown,
): string {
  return String(
    value ?? "",
  )
    .replaceAll(
      "&",
      "&amp;",
    )
    .replaceAll(
      "<",
      "&lt;",
    )
    .replaceAll(
      ">",
      "&gt;",
    )
    .replaceAll(
      '"',
      "&quot;",
    )
    .replaceAll(
      "'",
      "&#039;",
    );
}

/* =========================================================
   FIELD LABEL
========================================================= */

function formatFieldLabel(
  key: string,
): string {
  return key
    .replace(
      /([a-z0-9])([A-Z])/g,
      "$1 $2",
    )
    .replace(
      /[_-]+/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim()
    .replace(
      /\b\w/g,
      (char) =>
        char.toUpperCase(),
    );
}

/* =========================================================
   FIELD VALUE
========================================================= */

function formatFieldValue(
  value: unknown,
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  if (
    typeof value ===
    "boolean"
  ) {
    return value
      ? "Yes"
      : "No";
  }

  if (
    value instanceof Date
  ) {
    return formatDate(
      value,
    );
  }

  if (
    Array.isArray(value)
  ) {
    if (
      value.length === 0
    ) {
      return "—";
    }

    return value
      .map(
        (
          item,
        ) =>
          formatFieldValue(
            item,
          ),
      )
      .join(", ");
  }

  if (
    typeof value ===
    "object"
  ) {
    try {
      return JSON.stringify(
        value,
        null,
        2,
      );
    } catch {
      return String(
        value,
      );
    }
  }

  return String(value);
}

/* =========================================================
   INTERNAL FIELDS

   These fields should never appear in admin emails.
========================================================= */

const INTERNAL_FIELDS =
  new Set([
    "recaptchaToken",
    "captchaToken",
    "__v",
  ]);

/* =========================================================
   BUILD EVERY FORM FIELD

   This reads the actual submitted object, so fields are
   automatically included without manually maintaining
   every email template.
========================================================= */

function buildAllFormFields(
  data: Record<
    string,
    unknown
  >,
): Array<{
  label: string;
  value: string;
}> {
  return Object.entries(
    data,
  )
    .filter(
      ([key]) =>
        !INTERNAL_FIELDS.has(
          key,
        ),
    )
    .map(
      ([
        key,
        value,
      ]) => ({
        label:
          formatFieldLabel(
            key,
          ),

        value:
          formatFieldValue(
            value,
          ),
      }),
    );
}

/* =========================================================
   EMAIL SUBJECT
========================================================= */

function buildEmailSubject(
  subject: string,
): string {
  const cleanSubject =
    subject.trim();

  if (
    cleanSubject
      .toLowerCase()
      .includes(
        WEBSITE_NAME.toLowerCase(),
      )
  ) {
    return cleanSubject;
  }

  return `${WEBSITE_NAME} Website | ${cleanSubject}`;
}

/* =========================================================
   SUBMIT FORM
========================================================= */

export async function submitForm<
  T extends Record<string, unknown>,
>({
  model,
  data,
  emailConfig,
  sheetConfig,
}: {
  model: {
    create: (
      data: T,
    ) => Promise<unknown>;
  };

  data: T;

  emailConfig: (
    doc: FormDocument<T>,
  ) => EmailConfig;

  sheetConfig: (
    doc: FormDocument<T>,
  ) => SheetConfig;
}): Promise<SubmitFormResult<T>> {
  /* =======================================================
     01. DATABASE
  ======================================================= */

  await connectDB();

  const doc =
    (await model.create(
      data,
    )) as FormDocument<T>;

  /* =======================================================
     02. PREPARE EMAIL
  ======================================================= */

  const email =
    emailConfig(doc);

  const submittedFields =
    buildAllFormFields(
      data,
    );

  const submittedAt =
    formatDate(
      doc.createdAt ??
        new Date(),
    );

  const emailHtml =
    buildEmailHtml({
      title:
        email.subject,

      subtitle:
        "A new form submission has been received through the website.",

      fields:
        submittedFields,

      source:
        WEBSITE_SOURCE,

      date:
        submittedAt,
    });

  /* =======================================================
     03. PREPARE GOOGLE SHEET
  ======================================================= */

  let sheet:
    | SheetConfig
    | null = null;

  if (SPREADSHEET_ID) {
    try {
      sheet =
        sheetConfig(
          doc,
        );
    } catch (error) {
      console.error(
        "[Form] Failed to build Google Sheet row:",
        error,
      );
    }
  }

  /* =======================================================
     04. EMAIL + SHEET IN PARALLEL
  ======================================================= */

  const emailPromise =
    transporter.sendMail({
      from:
        `"${WEBSITE_NAME}" <${process.env.EMAIL_USER}>`,

      to:
        email
          .toAddresses
          ?.length
          ? email.toAddresses
          : DEFAULT_ADMIN_EMAILS,

      replyTo:
        email.replyTo ||
        undefined,

      subject:
        buildEmailSubject(
          email.subject,
        ),

      html:
        emailHtml,
    });

  const sheetPromise:
    Promise<boolean> =
    SPREADSHEET_ID &&
    sheet
      ? appendToExcel(
          SPREADSHEET_ID,
          sheet.sheetName,
          sheet.headers,
          sheet.rowData,
        )
      : Promise.resolve(
          false,
        );

  const [
    emailResult,
    sheetResult,
  ] =
    await Promise.allSettled([
      emailPromise,
      sheetPromise,
    ]);

  /* =======================================================
     05. EMAIL STATUS
  ======================================================= */

  const emailStatus:
    | "success"
    | "failed" =
    emailResult.status ===
    "fulfilled"
      ? "success"
      : "failed";

  if (
    emailResult.status ===
    "rejected"
  ) {
    console.error(
      "[Form] Email delivery failed:",
      emailResult.reason,
    );
  }

  /* =======================================================
     06. SHEET STATUS
  ======================================================= */

  let sheetStatus:
    | "success"
    | "failed"
    | "skipped";

  if (
    !SPREADSHEET_ID ||
    !sheet
  ) {
    sheetStatus =
      "skipped";
  } else if (
    sheetResult.status ===
      "fulfilled" &&
    sheetResult.value ===
      true
  ) {
    sheetStatus =
      "success";
  } else {
    sheetStatus =
      "failed";
  }

  if (
    sheetResult.status ===
    "rejected"
  ) {
    console.error(
      "[Form] Google Sheet save failed:",
      sheetResult.reason,
    );
  }

  /* =======================================================
     07. LOG
  ======================================================= */

  console.log(
    "[Form] Submission processed:",
    {
      id:
        doc._id
          ?.toString?.() ??
        "unknown",

      form:
        email.subject,

      mongo:
        "success",

      email:
        emailStatus,

      sheet:
        sheetStatus,
    },
  );

  /* =======================================================
     08. RETURN
  ======================================================= */

  return {
    doc,

    integrations: {
      mongo:
        true,

      email:
        emailStatus,

      sheet:
        sheetStatus,
    },
  };
}


/* =========================================================
   DATE FORMAT
========================================================= */

export function formatDate(
  date: Date,
): string {
  return new Date(
    date,
  ).toLocaleString(
    "en-IN",
    {
      timeZone:
        "Asia/Kolkata",

      day:
        "2-digit",

      month:
        "short",

      year:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit",

      second:
        "2-digit",

      hour12:
        true,
    },
  );
}

/* =========================================================
   PREMIUM EMAIL TEMPLATE
========================================================= */

export function buildEmailHtml({
  title,
  subtitle,
  fields,
  source,
  date,
}: {
  title: string;

  subtitle: string;

  fields: Array<{
    label: string;
    value: string;
  }>;

  source: string;

  date: string;
}): string {
  const rows =
    fields
      .map(
        (
          field,
        ) => {
          const value =
            field.value
              ?.trim() ||
            "—";

          const formattedValue =
            escapeHtml(
              value,
            ).replace(
              /\n/g,
              "<br />",
            );

          return `
            <tr>
              <td
                style="
                  width: 34%;
                  padding: 14px 18px 14px 0;

                  border-bottom:
                    1px solid #ecece7;

                  vertical-align:
                    top;

                  color:
                    #77756f;

                  font-size:
                    12px;

                  font-weight:
                    600;

                  line-height:
                    1.55;
                "
              >
                ${escapeHtml(
                  field.label,
                )}
              </td>

              <td
                style="
                  padding:
                    14px 0;

                  border-bottom:
                    1px solid #ecece7;

                  vertical-align:
                    top;

                  color:
                    #171717;

                  font-size:
                    13px;

                  font-weight:
                    500;

                  line-height:
                    1.65;

                  word-break:
                    break-word;
                "
              >
                ${formattedValue}
              </td>
            </tr>
          `;
        },
      )
      .join("");

  return `
    <!doctype html>

    <html>
      <head>
        <meta
          charset="UTF-8"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>

      <body
        style="
          margin: 0;
          padding: 0;

          background:
            #f3f4f1;

          font-family:
            Arial,
            Helvetica,
            sans-serif;

          color:
            #171717;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"

          style="
            width:
              100%;

            background:
              #f3f4f1;
          "
        >
          <tr>
            <td
              align="center"

              style="
                padding:
                  38px
                  16px;
              "
            >
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"

                style="
                  width:
                    100%;

                  max-width:
                    680px;

                  overflow:
                    hidden;

                  border:
                    1px solid
                    #e3e4df;

                  border-radius:
                    18px;

                  background:
                    #ffffff;
                "
              >
                <!-- HEADER -->

                <tr>
                  <td
                    style="
                      padding:
                        30px;

                      background:
                        #06151b;

                      color:
                        #ffffff;
                    "
                  >
                    <div
                      style="
                        width:
                          44px;

                        height:
                          3px;

                        margin-bottom:
                          18px;

                        border-radius:
                          999px;

                        background:
                          #fbb216;
                      "
                    ></div>

                    <div
                      style="
                        margin-bottom:
                          8px;

                        color:
                          #fbb216;

                        font-size:
                          10px;

                        font-weight:
                          700;

                        line-height:
                          1.4;

                        letter-spacing:
                          1.5px;

                        text-transform:
                          uppercase;
                      "
                    >
                      ${escapeHtml(
                        WEBSITE_NAME,
                      )}
                    </div>

                    <h1
                      style="
                        margin:
                          0;

                        color:
                          #ffffff;

                        font-size:
                          25px;

                        font-weight:
                          700;

                        line-height:
                          1.16;

                        letter-spacing:
                          -0.5px;
                      "
                    >
                      ${escapeHtml(
                        title,
                      )}
                    </h1>

                    <p
                      style="
                        margin:
                          10px
                          0
                          0;

                        max-width:
                          530px;

                        color:
                          #9aa5aa;

                        font-size:
                          12px;

                        line-height:
                          1.7;
                      "
                    >
                      ${escapeHtml(
                        subtitle,
                      )}
                    </p>
                  </td>
                </tr>

                <!-- META -->

                <tr>
                  <td
                    style="
                      padding:
                        18px
                        30px;

                      border-bottom:
                        1px solid
                        #ecece7;

                      background:
                        #fafaf7;
                    "
                  >
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td
                          valign="top"
                        >
                          <div
                            style="
                              color:
                                #9b998f;

                              font-size:
                                9px;

                              font-weight:
                                700;

                              letter-spacing:
                                1.3px;

                              text-transform:
                                uppercase;
                            "
                          >
                            Source
                          </div>

                          <div
                            style="
                              margin-top:
                                5px;

                              color:
                                #34332f;

                              font-size:
                                12px;

                              font-weight:
                                600;

                              line-height:
                                1.5;
                            "
                          >
                            ${escapeHtml(
                              source,
                            )}
                          </div>
                        </td>

                        <td
                          align="right"
                          valign="top"
                        >
                          <div
                            style="
                              color:
                                #9b998f;

                              font-size:
                                9px;

                              font-weight:
                                700;

                              letter-spacing:
                                1.3px;

                              text-transform:
                                uppercase;
                            "
                          >
                            Submitted
                          </div>

                          <div
                            style="
                              margin-top:
                                5px;

                              color:
                                #34332f;

                              font-size:
                                12px;

                              font-weight:
                                600;

                              line-height:
                                1.5;
                            "
                          >
                            ${escapeHtml(
                              date,
                            )}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- DETAILS -->

                <tr>
                  <td
                    style="
                      padding:
                        28px
                        30px
                        32px;
                    "
                  >
                    <div
                      style="
                        margin-bottom:
                          10px;

                        color:
                          #2d5a8c;

                        font-size:
                          9px;

                        font-weight:
                          700;

                        letter-spacing:
                          1.4px;

                        text-transform:
                          uppercase;
                      "
                    >
                      Complete Submission Details
                    </div>

                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"

                      style="
                        width:
                          100%;

                        border-collapse:
                          collapse;
                      "
                    >
                      ${rows}
                    </table>
                  </td>
                </tr>

                <!-- FOOTER -->

                <tr>
                  <td
                    style="
                      padding:
                        18px
                        30px;

                      border-top:
                        1px solid
                        #ecece7;

                      background:
                        #fafaf7;

                      color:
                        #9b998f;

                      font-size:
                        10px;

                      line-height:
                        1.7;
                    "
                  >
                    This submission was received through the
                    ${escapeHtml(
                      WEBSITE_NAME,
                    )} website.
                  </td>
                </tr>
              </table>

              <div
                style="
                  margin-top:
                    16px;

                  color:
                    #a3a39d;

                  font-size:
                    9px;

                  line-height:
                    1.6;

                  text-align:
                    center;
                "
              >
                ${escapeHtml(
                  WEBSITE_NAME,
                )}
                &nbsp;•&nbsp;
                Website Form Notification
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

/* =========================================================
   GOOGLE SHEET HEADERS
========================================================= */

export const SHEET_HEADERS: string[] = [
  "Date & Time",

  "Platform",

  "Platform",

  "Product Profile",

  "Company Name",

  "Contact Person",

  "Designation",

  "Email Id",

  "Mobile No.",

  "Website",

  "Address",

  "Country",

  "Interest For",

  "Message",

  "CORRECTION",

  "STATUS 1",

  "STATUS 2",

  "STATUS 3",

  "STATUS 4",

  "STATUS 5",

  "STATUS 6",

  "STATUS 7",
];

/* =========================================================
   GOOGLE SHEET ROW
========================================================= */

export function buildSheetRow({
  formType,

  fullName,

  company,

  designation,

  email,

  phone,

  website,

  address,

  country,

  productProfile,

  interestFor,

  message,

  date,
}: {
  formType: string;

  fullName: string;

  company?: string;

  designation?: string;

  email: string;

  phone: string;

  website?: string;

  address?: string;

  country?: string;

  productProfile?: string;

  interestFor?: string;

  message?: string;

  date: string;
}): SheetConfig {
  return {
    sheetName:
      "Website Enquiries",

    headers:
      SHEET_HEADERS,

    rowData: [
      // A
      date,

      // B
      "Website",

      // C
      formType,

      // D
      productProfile ??
        "",

      // E
      company ??
        "",

      // F
      fullName ??
        "",

      // G
      designation ??
        "",

      // H
      email ??
        "",

      // I
      phone ??
        "",

      // J
      website ??
        "",

      // K
      address ??
        "",

      // L
      country ??
        "",

      // M
      interestFor ??
        "",

      // N
      message ??
        "",

      // O — CORRECTION
      "",

      // P — STATUS 1
      "",

      // Q — STATUS 2
      "",

      // R — STATUS 3
      "",

      // S — STATUS 4
      "",

      // T — STATUS 5
      "",

      // U — STATUS 6
      "",

      // V — STATUS 7
      "",
    ],
  };
}