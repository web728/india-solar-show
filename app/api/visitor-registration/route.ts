import { NextResponse } from "next/server";

import Visitor from "@/models/Visitor";

import {
  submitForm,
  formatDate,
  buildSheetRow,
} from "@/lib/formService";

import {
  visitorSchema,
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
       02. RECAPTCHA TOKEN
    ===================================================== */

    const recaptchaToken =
      typeof body.recaptchaToken ===
      "string"
        ? body.recaptchaToken
        : "";

    if (
      !recaptchaToken
    ) {
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

    /* =====================================================
       03. VERIFY RECAPTCHA
    ===================================================== */

    const captchaValid =
      await verifyRecaptcha(
        recaptchaToken,
      );

    if (
      !captchaValid
    ) {
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
       04. REMOVE INTERNAL FIELDS
    ===================================================== */

    const {
      recaptchaToken:
        _recaptchaToken,

      captchaToken:
        _captchaToken,

      ...formData
    } = body;

    /* =====================================================
       05. VALIDATE
    ===================================================== */

    const validationResult =
      visitorSchema.safeParse(
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
       06. CLEAN VALIDATED DATA
    ===================================================== */

    const data =
      validationResult.data;

    /* =====================================================
       07. SUBMIT
    ===================================================== */

    const result =
      await submitForm({
        model:
          Visitor,

        data,

        /* =================================================
           EMAIL

           formService automatically includes every
           submitted field in the premium email.
        ================================================= */

        emailConfig:
          (doc) => ({
            subject:
              `New Visitor Registration – ${doc.fullName}`,

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
                "Visitor Registration",

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

              country:
                doc.country,

              productProfile:
                doc.industry,

              interestFor:
                doc.visitPurpose,

              message:
                "",

              date:
                formatDate(
                  doc.createdAt,
                ),
            }),
      });

    /* =====================================================
       08. SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Thank you! Your visitor registration has been submitted successfully.",

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
      "[Visitor Registration] Error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Something went wrong while submitting your registration. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}