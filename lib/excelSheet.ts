// lib/excelSheet.ts
import { google } from "googleapis";

function getCredentials() {
  const base64 = process.env.GOOGLE_CREDENTIALS_BASE64;
  const raw = process.env.GOOGLE_CREDENTIALS_JSON;

  let jsonString: string;

  if (base64) {
    jsonString = Buffer.from(base64, "base64").toString("utf-8");
  } else if (raw) {
    jsonString = raw;
  } else {
    throw new Error(
      "Neither GOOGLE_CREDENTIALS_BASE64 nor GOOGLE_CREDENTIALS_JSON environment variable is set."
    );
  }

  try {
    return JSON.parse(jsonString);
  } catch (err) {
    console.error(
      "Failed to parse Google credentials JSON. First 30 chars:",
      jsonString.slice(0, 30)
    );
    throw err;
  }
}

async function getSheetsClient() {
  const credentials = getCredentials();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  return google.sheets({ version: "v4", auth: client as any });
}

// Sirf column A check karta hai ki header hai ya nahi (poori row A1:Z1 check karne se
// wahi "gap" wala confusion ho sakta hai)
async function ensureHeaderRow(
  googleSheets: any,
  spreadsheetId: string,
  sheetName: string,
  headers: string[]
) {
  const existing = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:A1`,
  });

  const hasHeader =
    existing.data.values &&
    existing.data.values.length > 0 &&
    existing.data.values[0][0];

  if (!hasHeader) {
    await googleSheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    });
    console.log(`Header row added to Excel sheet: ${sheetName}`);
  }
}

// FIX: column A padh kar exact agli khaali row number nikalo — isse hume pata
// chal jaata hai row kahan likhni hai, Sheets ke apne "table detection" pe
// depend nahi karna padta (jo hi asli bug tha)
async function getNextEmptyRow(
  googleSheets: any,
  spreadsheetId: string,
  sheetName: string
): Promise<number> {
  const result = await googleSheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:A`,
  });

  const rows = result.data.values || [];
  return rows.length + 1; // header ke baad wali agli khaali row
}

export async function appendToExcel(
  spreadsheetId: string,
  sheetName: string,
  headers: string[],
  rowData: (string | number)[]
) {
  try {
    const googleSheets = await getSheetsClient();

    await ensureHeaderRow(googleSheets, spreadsheetId, sheetName, headers);

    const nextRow = await getNextEmptyRow(googleSheets, spreadsheetId, sheetName);

    // rowData.length ke hisaab se end column nikalo (A + count - 1)
    // Note: agar rowData kabhi 26 se zyada columns ka ho to ye formula fail hoga,
    // par tere case me 14 columns hi hain (A-N) to safe hai.
    const endCol = String.fromCharCode("A".charCodeAt(0) + rowData.length - 1);

    await googleSheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A${nextRow}:${endCol}${nextRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [rowData] },
    });

    console.log(`Data successfully saved to Excel sheet: ${sheetName}, row ${nextRow}`);
  } catch (error) {
    // Excel me save na ho paaye to bhi Mongo save aur mail bhejna nahi rukna chahiye
    console.error("Error saving data to Google Sheets:", error);
  }
}