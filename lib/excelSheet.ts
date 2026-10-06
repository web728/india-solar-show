// lib/excelSheet.ts

import { google } from "googleapis";

import type {
  SheetCellValue,
} from "@/lib/types";

/* =========================================================
   TYPES
========================================================= */

type GoogleCredentials = {
  client_email?: string;
  private_key?: string;
  project_id?: string;

  [key: string]: unknown;
};

/* =========================================================
   COLUMN HELPERS
========================================================= */

/**
 * Converts:
 * 1  -> A
 * 2  -> B
 * 26 -> Z
 * 27 -> AA
 * 28 -> AB
 *
 * Future-safe even if sheet grows beyond 26 columns.
 */
function columnNumberToLetter(
  columnNumber: number,
): string {
  let result = "";
  let value = columnNumber;

  while (value > 0) {
    const remainder =
      (value - 1) % 26;

    result =
      String.fromCharCode(
        65 + remainder,
      ) + result;

    value = Math.floor(
      (value - 1) / 26,
    );
  }

  return result;
}

/* =========================================================
   CREDENTIALS
========================================================= */

function getCredentials():
  GoogleCredentials {
  const base64 =
    process.env
      .GOOGLE_CREDENTIALS_BASE64;

  const raw =
    process.env
      .GOOGLE_CREDENTIALS_JSON;

  let jsonString: string;

  if (base64) {
    try {
      jsonString = Buffer.from(
        base64,
        "base64",
      ).toString("utf-8");
    } catch {
      throw new Error(
        "GOOGLE_CREDENTIALS_BASE64 could not be decoded.",
      );
    }
  } else if (raw) {
    jsonString = raw;
  } else {
    throw new Error(
      "Neither GOOGLE_CREDENTIALS_BASE64 nor GOOGLE_CREDENTIALS_JSON environment variable is configured.",
    );
  }

  try {
    const parsed =
      JSON.parse(
        jsonString,
      ) as GoogleCredentials;

    if (
      !parsed.client_email ||
      !parsed.private_key
    ) {
      throw new Error(
        "Google service account credentials are missing client_email or private_key.",
      );
    }

    /*
     * Useful when credentials were manually
     * stored in an env variable with escaped \n.
     */
    if (
      typeof parsed.private_key ===
      "string"
    ) {
      parsed.private_key =
        parsed.private_key.replace(
          /\\n/g,
          "\n",
        );
    }

    return parsed;
  } catch (error) {
    console.error(
      "Failed to parse Google credentials.",
    );

    throw error;
  }
}

/* =========================================================
   GOOGLE SHEETS CLIENT
========================================================= */

async function getSheetsClient() {
  const credentials =
    getCredentials();

  const auth =
    new google.auth.GoogleAuth({
      credentials,

      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

  const client =
    await auth.getClient();

  return google.sheets({
    version: "v4",

    auth:
      client as any,
  });
}

/* =========================================================
   SHEET NAME
========================================================= */

/**
 * Sheet names containing spaces or special characters
 * should be wrapped in single quotes in A1 notation.
 *
 * Example:
 * Website Enquiries
 * becomes
 * 'Website Enquiries'
 */
function quoteSheetName(
  sheetName: string,
): string {
  return `'${sheetName.replace(
    /'/g,
    "''",
  )}'`;
}

/* =========================================================
   NORMALIZE CELL
========================================================= */

function normalizeCellValue(
  value: SheetCellValue,
): string | number {
  if (
    typeof value ===
    "boolean"
  ) {
    return value
      ? "Yes"
      : "No";
  }

  return value;
}

/* =========================================================
   ENSURE HEADER ROW
========================================================= */

async function ensureHeaderRow(
  googleSheets: Awaited<
    ReturnType<
      typeof getSheetsClient
    >
  >,

  spreadsheetId: string,

  sheetName: string,

  headers: string[],
) {
  if (
    headers.length === 0
  ) {
    return;
  }

  const quotedSheetName =
    quoteSheetName(
      sheetName,
    );

  /*
   * We only need A1 to determine
   * whether the sheet already has data.
   */
  const existing =
    await googleSheets
      .spreadsheets
      .values
      .get({
        spreadsheetId,

        range:
          `${quotedSheetName}!A1`,
      });

  const firstCell =
    existing.data.values?.[0]?.[0];

  if (firstCell) {
    return;
  }

  const endColumn =
    columnNumberToLetter(
      headers.length,
    );

  await googleSheets
    .spreadsheets
    .values
    .update({
      spreadsheetId,

      range:
        `${quotedSheetName}!A1:${endColumn}1`,

      valueInputOption:
        "RAW",

      requestBody: {
        values: [
          headers,
        ],
      },
    });

  console.log(
    `[Google Sheets] Header row created in "${sheetName}".`,
  );
}

/* =========================================================
   APPEND ROW
========================================================= */

export async function appendToExcel(
  spreadsheetId: string,

  sheetName: string,

  headers: string[],

  rowData: SheetCellValue[],
): Promise<boolean> {
  try {
    if (!spreadsheetId) {
      console.warn(
        "[Google Sheets] Spreadsheet ID is missing. Skipping sheet save.",
      );

      return false;
    }

    if (!sheetName) {
      console.warn(
        "[Google Sheets] Sheet name is missing. Skipping sheet save.",
      );

      return false;
    }

    if (
      rowData.length === 0
    ) {
      console.warn(
        `[Google Sheets] Empty row received for "${sheetName}".`,
      );

      return false;
    }

    /* =====================================================
       Validate headers vs row
    ===================================================== */

    if (
      headers.length !==
      rowData.length
    ) {
      console.warn(
        `[Google Sheets] Header/row mismatch in "${sheetName}". Headers: ${headers.length}, Row values: ${rowData.length}.`,
      );
    }

    const googleSheets =
      await getSheetsClient();

    /* =====================================================
       Ensure first row exists
    ===================================================== */

    await ensureHeaderRow(
      googleSheets,
      spreadsheetId,
      sheetName,
      headers,
    );

    /* =====================================================
       Normalize values
    ===================================================== */

    const normalizedRow:
      Array<
        string | number
      > =
      rowData.map(
        normalizeCellValue,
      );

    const quotedSheetName =
      quoteSheetName(
        sheetName,
      );

    /*
     * Use at least the amount of columns
     * required by the row/header.
     */
    const totalColumns =
      Math.max(
        headers.length,
        normalizedRow.length,
        1,
      );

    const endColumn =
      columnNumberToLetter(
        totalColumns,
      );

    /* =====================================================
       Native Google Sheets append
    ===================================================== */

    const response =
      await googleSheets
        .spreadsheets
        .values
        .append({
          spreadsheetId,

          range:
            `${quotedSheetName}!A:${endColumn}`,

          valueInputOption:
            "USER_ENTERED",

          insertDataOption:
            "INSERT_ROWS",

          includeValuesInResponse:
            false,

          requestBody: {
            majorDimension:
              "ROWS",

            values: [
              normalizedRow,
            ],
          },
        });

    const updatedRange =
      response.data.updates
        ?.updatedRange;

    console.log(
      updatedRange
        ? `[Google Sheets] Data saved successfully: ${updatedRange}`
        : `[Google Sheets] Data saved successfully to "${sheetName}".`,
    );

    return true;
  } catch (error) {
    /*
     * Sheet failure should not crash
     * the entire form submission flow.
     */
    console.error(
      `[Google Sheets] Failed to save data to "${sheetName}":`,
      error,
    );

    return false;
  }
}