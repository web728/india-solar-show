import { NextResponse } from "next/server";

import MediaPartner from "@/models/MediaPartner";

import {
  submitForm,
  formatDate,
  buildSheetRow,
} from "@/lib/formService";

import {
  mediaPartnerSchema,
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
      mediaPartnerSchema.safeParse(
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
          MediaPartner,

        data,

        /* =================================================
           EMAIL
        ================================================= */

        emailConfig:
          (doc) => ({
            subject:
              `New Media Partner Enquiry – ${doc.organization}`,

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
                "Media Partner Enquiry",

              fullName:
                doc.fullName,

              company:
                doc.organization,

              designation:
                doc.designation ??
                "",

              email:
                doc.email,

              phone:
                doc.phone,

              website:
                doc.website ??
                "",

              address:
                "",

              country:
                doc.country ??
                "",

              productProfile:
                doc.mediaType ??
                "",

              interestFor:
                "Media Partnership",

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
          "Thank you! Your media partner enquiry has been submitted successfully.",

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
      "[Media Partner] Error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Something went wrong while submitting your media partner enquiry. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}