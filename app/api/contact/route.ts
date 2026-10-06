import { NextResponse } from "next/server";

import Contact from "@/models/Contact";

import {
  submitForm,
  formatDate,
  buildSheetRow,
} from "@/lib/formService";

import {
  contactSchema,
} from "@/lib/validation";

import {
  verifyRecaptcha,
} from "@/lib/verifyRecaptcha";

/* =========================================================
   ROUTE CONFIG
========================================================= */

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

/* =========================================================
   POST
========================================================= */

export async function POST(
  req: Request,
) {
  try {
    /* =====================================================
       01. READ BODY
    ===================================================== */

    const body =
      (await req.json()) as Record<
        string,
        unknown
      >;

    /* =====================================================
       02. RECAPTCHA
    ===================================================== */

    const recaptchaToken =
      typeof body.recaptchaToken ===
      "string"
        ? body.recaptchaToken
        : "";

    if (!recaptchaToken) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please complete the security verification.",
        },
        {
          status: 400,
        },
      );
    }

    const captchaValid =
      await verifyRecaptcha(
        recaptchaToken,
      );

    if (!captchaValid) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Security verification failed. Please try again.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       03. REMOVE INTERNAL FIELDS
    ===================================================== */

    const {
      recaptchaToken:
        _recaptchaToken,

      captchaToken:
        _captchaToken,

      ...formData
    } = body;

    /* =====================================================
       04. VALIDATE
    ===================================================== */

    const validationResult =
      contactSchema.safeParse(
        formData,
      );

    if (
      !validationResult.success
    ) {
      const firstIssue =
        validationResult
          .error
          .issues[0];

      return NextResponse.json(
        {
          success: false,

          message:
            firstIssue
              ?.message ??
            "Please check the submitted information.",

          errors:
            validationResult
              .error
              .flatten()
              .fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       05. CLEAN DATA
    ===================================================== */

    const data =
      validationResult.data;

    /* =====================================================
       06. SUBMIT
    ===================================================== */

    const result =
      await submitForm({
        model:
          Contact,

        data,

        emailConfig:
          (doc) => ({
            subject:
              `New Contact Enquiry – ${doc.subject}`,

            html:
              "",

            replyTo:
              doc.email,
          }),

        sheetConfig:
          (doc) =>
            buildSheetRow({
              formType:
                "Contact Enquiry",

              fullName:
                doc.fullName,

              company:
                doc.company ??
                "",

              designation:
                "",

              email:
                doc.email,

              phone:
                doc.phone,

              website:
                "",

              address:
                "",

              country:
                "",

              productProfile:
                "",

              interestFor:
                doc.subject,

              message:
                doc.message ??
                "",

              date:
                formatDate(
                  doc.createdAt,
                ),
            }),
      });

    /* =====================================================
       07. SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Thank you! Your message has been sent successfully.",

        id:
          result.doc._id
            ?.toString?.() ??
          null,

        integrations:
          result.integrations,
      },
      {
        status: 201,
      },
    );
  } catch (
    error
  ) {
    console.error(
      "[Contact Form] Error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Something went wrong while sending your message. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}