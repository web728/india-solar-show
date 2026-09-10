import { connectDB } from "@/lib/db";
import { transporter } from "@/lib/email";
import { appendToExcel } from "@/lib/excelSheet";
import type { EmailConfig, SheetConfig } from "@/lib/types";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID as string;
const DEFAULT_TO = ["info@futurextrade.com", "admin@futurextrade.com"];

export async function submitForm<T extends Record<string, unknown>>({
  model,
  data,
  emailConfig,
  sheetConfig,
}: {
  model: { create: (data: T) => Promise<T & { createdAt: Date }> };
  data: T;
  emailConfig: (doc: T & { createdAt: Date }) => EmailConfig;
  sheetConfig: (doc: T & { createdAt: Date }) => SheetConfig;
}) {
  await connectDB();

  const doc = await model.create(data);

  const email = emailConfig(doc);
  await transporter.sendMail({
    from: `"India Solar Show Website" <${process.env.EMAIL_USER}>`,
    to: email.toAddresses.length > 0 ? email.toAddresses : DEFAULT_TO,
    subject: email.subject,
    html: email.html,
  });

  if (SPREADSHEET_ID) {
    const sheet = sheetConfig(doc);
    await appendToExcel(
      SPREADSHEET_ID,
      sheet.sheetName,
      sheet.headers,
      sheet.rowData
    );
  }

  return doc;
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
}

export function buildEmailHtml({
  title,
  subtitle,
  fields,
  source,
  date,
}: {
  title: string;
  subtitle: string;
  fields: { label: string; value: string }[];
  source: string;
  date: string;
}): string {
  const rows = fields
    .map(
      (f) => `
    <tr>
      <td style="padding: 8px 0; color: #888; width: 140px;"><strong>${f.label}</strong></td>
      <td style="padding: 8px 0;">${f.value || "—"}</td>
    </tr>`
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0a0a0a; padding: 20px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0;">India Solar Show</h2>
        <p style="color: #f7941d; margin: 4px 0 0;">${subtitle}</p>
      </div>
      <div style="padding: 20px; border: 1px solid #e5e5e5; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">${rows}</table>
      </div>
      <div style="padding: 12px 20px; background: #f5f5f5; border: 1px solid #e5e5e5; border-top: none; font-size: 12px; color: #999;">
        Source: ${source} &nbsp;|&nbsp; Submitted: ${date}
      </div>
    </div>
  `;
}

const SHEET_HEADERS = [
  "Date & Time",
  "Platform",
  "Register As",
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
];

export function buildSheetRow({
  formType,
  fullName,
  company,
  designation,
  email,
  phone,
  country,
  message,
  date,
}: {
  formType: string;
  fullName: string;
  company?: string;
  designation?: string;
  email: string;
  phone: string;
  country?: string;
  message?: string;
  date: string;
}): SheetConfig {
  return {
    sheetName: "Website Enquiries",
    headers: SHEET_HEADERS,
    rowData: [
      date,
      formType,
      formType,
      "-",
      company || "-",
      fullName,
      designation || "-",
      email,
      phone,
      "-",
      "-",
      country || "-",
      message || "-",
      "-",
    ],
  };
}
