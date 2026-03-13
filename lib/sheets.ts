import { google } from "googleapis";

export async function getMembers() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: "Sheet1!A2:D100",
  });

  const rows = res.data.values ?? [];

  return rows.map((row, i) => ({
    id: String(i),
    position: row[0] ?? "",
    name: row[1] ?? "",
    progress: Number(row[2]) || 0,
    commits: Number(row[3]) || 0,
  }));
}
