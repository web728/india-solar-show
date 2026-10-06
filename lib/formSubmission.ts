/* =========================================================
   COMMON NORMALIZED FORM SUBMISSION
========================================================= */

export interface NormalizedFormSubmission {
  /**
   * Form name / source.
   *
   * Examples:
   * Exhibitor Registration
   * Visitor Registration
   * Contact Enquiry
   * Sponsorship Enquiry
   * Brochure Download
   * Media Partner Enquiry
   * Conference Registration
   */
  formType: string;

  /**
   * Product / service profile.
   */
  productProfile?: string;

  /**
   * Company / organisation name.
   */
  companyName?: string;

  /**
   * Person submitting the form.
   */
  contactPerson?: string;

  designation?: string;

  email?: string;

  mobile?: string;

  website?: string;

  address?: string;

  country?: string;

  /**
   * Main interest.
   *
   * Examples:
   * 18 Sqmtr Booth
   * Sponsorship
   * Visitor
   * Conference
   */
  interestFor?: string;

  message?: string;

  /**
   * Complete original submitted form.
   *
   * This keeps every field even if
   * that field does not have a dedicated
   * Google Sheet column.
   */
  rawData: Record<string, unknown>;
}

/* =========================================================
   INTEGRATION STATUS
========================================================= */

export type IntegrationStatus =
  | "pending"
  | "success"
  | "failed";

/* =========================================================
   PROCESS RESULT
========================================================= */

export interface FormProcessResult {
  success: boolean;

  mongo: boolean;

  email: boolean;

  sheet: boolean;

  id?: string;

  message?: string;
}