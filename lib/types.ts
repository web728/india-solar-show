export interface FormSubmissionData {
  formType: string;
  data: Record<string, unknown>;
}

export interface FormSubmissionResult {
  success: boolean;
  message: string;
}

export interface EmailConfig {
  subject: string;
  toAddresses: string[];
  html: string;
}

export interface SheetConfig {
  sheetName: string;
  headers: string[];
  rowData: (string | number)[];
}
