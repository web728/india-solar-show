/* =========================================================
   COMMON FORM TYPES
========================================================= */

export interface FormSubmissionData {
  formType: string;

  data: Record<
    string,
    unknown
  >;
}

export interface FormSubmissionResult {
  success: boolean;

  message: string;

  id?: string;
}

/* =========================================================
   EMAIL
========================================================= */

export interface EmailConfig {
  /**
   * Only form-specific subject.
   *
   * Example:
   * "New Exhibitor Registration"
   *
   * formService.ts automatically prefixes:
   * "India International Solar Show Website | ..."
   */
  subject: string;

  /**
   * Optional custom recipients.
   *
   * If empty or omitted,
   * formService.ts uses DEFAULT_TO.
   */
  toAddresses?: string[];

  /**
   * Complete HTML email body.
   */
  html: string;

  /**
   * Optional email address used for reply.
   *
   * Example:
   * visitor/exhibitor email address.
   */
  replyTo?: string;
}

/* =========================================================
   GOOGLE SHEETS
========================================================= */

export type SheetCellValue =
  | string
  | number
  | boolean;

export interface SheetConfig {
  /**
   * Exact Google Sheet tab name.
   *
   * Example:
   * "Website Enquiries"
   */
  sheetName: string;

  /**
   * Header row.
   */
  headers: string[];

  /**
   * Row values must follow
   * the same order as headers.
   */
  rowData: SheetCellValue[];
}