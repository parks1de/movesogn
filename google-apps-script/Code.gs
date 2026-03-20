/**
 * MOVE Sogn — Google Apps Script CMS
 * ====================================
 * HOW TO INSTALL:
 * 1. Open your Google Sheet
 * 2. Extensions → Apps Script
 * 3. Replace all code with this file
 * 4. Save, then Deploy → New deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web App URL → paste into NEXT_PUBLIC_SHEETS_API_URL in .env.local
 *
 * SHEET TABS REQUIRED (exact names, lowercase):
 *   mobilitet | marine | sykkel | eigedom | timeline | gallery
 *
 * Each sheet must have a header row (row 1) with column names matching the
 * field names in src/lib/sheets.ts.
 */

function doGet(e) {
  const sheet = e.parameter.sheet;

  if (!sheet) {
    return jsonResponse({ error: 'Missing ?sheet= parameter' });
  }

  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const tab = ss.getSheetByName(sheet);

    if (!tab) {
      return jsonResponse({ error: `Sheet "${sheet}" not found` });
    }

    const values = tab.getDataRange().getValues();
    if (values.length < 2) {
      return jsonResponse({ sheet, data: [] });
    }

    const headers = values[0].map(h => h.toString().trim());
    const data = values.slice(1)
      .filter(row => row.some(cell => cell !== ''))  // skip blank rows
      .map(row => {
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = row[i] !== undefined ? row[i].toString() : '';
        });
        return obj;
      });

    return jsonResponse({ sheet, data });

  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
