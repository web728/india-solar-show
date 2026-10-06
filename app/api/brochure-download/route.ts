import { NextResponse } from "next/server";

import BrochureDownload from "@/models/BrochureDownload";

import {
  submitForm,
  formatDate,
  buildSheetRow,
} from "@/lib/formService";

import {
  brochureSchema,
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
      brochureSchema.safeParse(
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
          BrochureDownload,

        data,

        /* =================================================
           EMAIL
        ================================================= */

        emailConfig:
          (doc) => ({
            subject:
              `New Brochure Download – ${doc.fullName}`,

            html:
              "",

            replyTo:
              doc.email,
          }),

        /* =================================================
           GOOGLE SHEET
        ================================================= */

        sheetConfig:
          (doc) =>
            buildSheetRow({
              formType:
                "Brochure Download",

              fullName:
                doc.fullName,

              company:
                doc.company ??
                "",

              designation:
                doc.designation ??
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
                doc.country ??
                "",

              productProfile:
                "",

              interestFor:
                "Brochure Download",

              message:
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
          "Thank you! Your brochure download request has been submitted successfully.",

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
      "[Brochure Download] Error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Something went wrong while submitting your brochure request. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}