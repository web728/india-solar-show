import { z } from "zod";

import {
  INTEREST_TYPES,
} from "@/data/siteData";

/* =========================================================
   COMMON FIELDS
========================================================= */

const nameField =
  z
    .string()
    .trim()
    .min(
      2,
      "Please enter your full name.",
    )
    .max(
      100,
      "Name is too long.",
    );

/* =========================================================
   EMAIL
========================================================= */

const emailField =
  z
    .string()
    .trim()
    .min(
      1,
      "Email is required.",
    )
    .email(
      "Enter a valid email address.",
    )
    .max(
      150,
      "Email is too long.",
    );

/* =========================================================
   PHONE

   Allowed examples:

   09876543210
   +91 98765 43210
   +1 (555) 123-4567
   001-555-1234
   +44.123.456.789
========================================================= */

const phoneField =
  z
    .string()
    .trim()
    .min(
      5,
      "Enter a valid phone number.",
    )
    .max(
      30,
      "Phone number is too long.",
    )
    .regex(
      /^[0-9+\-\s().]+$/,
      "Enter a valid phone number.",
    );

/* =========================================================
   OPTIONAL STRING
========================================================= */

const optionalString =
  z
    .string()
    .trim()
    .optional()
    .or(
      z.literal(""),
    );

/* =========================================================
   OPTIONAL MESSAGE

   No minimum length validation.
   Blank message is allowed.
========================================================= */

const optionalMessageField =
  z
    .string()
    .optional()
    .or(
      z.literal(""),
    );

/* =========================================================
   OPTIONAL WEBSITE

   Allowed:

   indiasolarshow.com
   www.indiasolarshow.com
   http://indiasolarshow.com
   https://indiasolarshow.com
   https://www.indiasolarshow.com/page
========================================================= */

const optionalWebsiteField =
  z
    .string()
    .trim()
    .optional()
    .or(
      z.literal(""),
    )
    .refine(
      (value) => {
        if (!value) {
          return true;
        }

        const normalizedValue =
          value.startsWith(
            "http://",
          ) ||
          value.startsWith(
            "https://",
          )
            ? value
            : `https://${value}`;

        try {
          const url =
            new URL(
              normalizedValue,
            );

          return Boolean(
            url.hostname &&
              url.hostname.includes(
                ".",
              ),
          );
        } catch {
          return false;
        }
      },
      {
        message:
          "Enter a valid website.",
      },
    );

/* =========================================================
   LEAD
========================================================= */

export const leadSchema =
  z.object({
    fullName:
      nameField,

    company:
      optionalString,

    email:
      emailField,

    phone:
      phoneField,

    designation:
      optionalString,

    country:
      optionalString,

    interestType:
      z.enum(
        INTEREST_TYPES,
        {
          message:
            "Please select an interest type.",
        },
      ),

    message:
      optionalMessageField,
  });

export type LeadFormValues =
  z.infer<
    typeof leadSchema
  >;

export type Lead =
  LeadFormValues & {
    id: string;

    createdAt: string;
  };

/* =========================================================
   VISITOR REGISTRATION
========================================================= */

export const visitorSchema =
  z.object({
    fullName:
      nameField,

    email:
      emailField,

    phone:
      phoneField,

    /* Optional */
    company:
      optionalString,

    designation:
      optionalString,

    country:
      z
        .string()
        .trim()
        .min(
          1,
          "Please select a country.",
        ),

    industry:
      z
        .string()
        .trim()
        .min(
          1,
          "Please select your industry.",
        ),

    visitPurpose:
      z
        .string()
        .trim()
        .min(
          1,
          "Please select your purpose of visit.",
        ),

    termsAgreed:
      z
        .boolean()
        .refine(
          (value) =>
            value === true,
          {
            message:
              "You must agree to the terms and conditions.",
          },
        ),
  });

export type VisitorFormValues =
  z.infer<
    typeof visitorSchema
  >;

/* =========================================================
   EXHIBITOR REGISTRATION
========================================================= */

export const exhibitorSchema =
  z.object({
    fullName:
      nameField,

    designation:
      z
        .string()
        .trim()
        .min(
          2,
          "Designation is required.",
        )
        .max(
          100,
          "Designation is too long.",
        ),

    company:
      z
        .string()
        .trim()
        .min(
          2,
          "Company name is required.",
        )
        .max(
          150,
          "Company name is too long.",
        ),

    /* Optional company website */
    website:
      optionalWebsiteField,

    addressLine1:
      z
        .string()
        .trim()
        .min(
          2,
          "Address is required.",
        )
        .max(
          250,
          "Address is too long.",
        ),

    city:
      optionalString,

    state:
      optionalString,

    postalCode:
      optionalString,

    country:
      z
        .string()
        .trim()
        .min(
          1,
          "Please select a country.",
        ),

    phone:
      phoneField,

    email:
      emailField,

    boothSize:
      z
        .string()
        .trim()
        .min(
          1,
          "Please select a booth size.",
        ),

    productsServices:
      z
        .string()
        .trim()
        .min(
          2,
          "Please describe your products/services.",
        ),

    sponsorshipInterest:
      z
        .string()
        .trim()
        .min(
          1,
          "Please select an option.",
        ),

    termsAgreed:
      z
        .boolean()
        .refine(
          (value) =>
            value === true,
          {
            message:
              "You must agree to the exhibitor terms and conditions.",
          },
        ),

    declaration:
      z
        .boolean()
        .refine(
          (value) =>
            value === true,
          {
            message:
              "Please confirm the declaration.",
          },
        ),
  });

export type ExhibitorFormValues =
  z.infer<
    typeof exhibitorSchema
  >;

/* =========================================================
   CONTACT FORM
========================================================= */

export const contactSchema =
  z.object({
    fullName:
      nameField,

    email:
      emailField,

    phone:
      phoneField,

    company:
      optionalString,

    subject:
      z
        .string()
        .trim()
        .min(
          2,
          "Please enter a subject.",
        ),

    /* No message validation */
    message:
      optionalMessageField,
  });

export type ContactFormValues =
  z.infer<
    typeof contactSchema
  >;

/* =========================================================
   SPONSORSHIP ENQUIRY
========================================================= */

export const sponsorshipSchema =
  z.object({
    fullName:
      nameField,

    email:
      emailField,

    phone:
      phoneField,

    company:
      optionalString,

    designation:
      optionalString,

    country:
      optionalString,

    sponsorshipTier:
      optionalString,

    /* No message validation */
    message:
      optionalMessageField,
  });

export type SponsorshipFormValues =
  z.infer<
    typeof sponsorshipSchema
  >;

/* =========================================================
   MEDIA PARTNER
========================================================= */

export const mediaPartnerSchema =
  z.object({
    fullName:
      nameField,

    email:
      emailField,

    phone:
      phoneField,

    organization:
      z
        .string()
        .trim()
        .min(
          2,
          "Organization name is required.",
        ),

    designation:
      optionalString,

    country:
      optionalString,

    mediaType:
      optionalString,

    website:
      optionalWebsiteField,

    /* No message validation */
    message:
      optionalMessageField,
  });

export type MediaPartnerFormValues =
  z.infer<
    typeof mediaPartnerSchema
  >;

/* =========================================================
   BROCHURE DOWNLOAD
========================================================= */

export const brochureSchema =
  z.object({
    fullName:
      nameField,

    email:
      emailField,

    phone:
      phoneField,

    /* Optional */
    company:
      optionalString,

    designation:
      optionalString,

    country:
      optionalString,
  });

export type BrochureFormValues =
  z.infer<
    typeof brochureSchema
  >;

/* =========================================================
   CONFERENCE REGISTRATION
========================================================= */

export const conferenceSchema =
  z.object({
    fullName:
      nameField,

    email:
      emailField,

    phone:
      phoneField,

    company:
      optionalString,

    designation:
      optionalString,

    country:
      optionalString,

    sessionInterest:
      optionalString,

    /* No message validation */
    message:
      optionalMessageField,
  });

export type ConferenceFormValues =
  z.infer<
    typeof conferenceSchema
  >;