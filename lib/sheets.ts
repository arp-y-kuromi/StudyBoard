import { google } from "googleapis";
import { getCommitCount } from "./github";

export type Member = {
  id: string;
  position: string;
  name: string;
  progress: number;
  subjects: {
    git: number;
    html_css: number;
    javascript: number;
    react: number;
    php: number;
    java: number;
  };
  commits: number;
};

export async function getMembers(): Promise<Member[]> {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: "Sheet1!A2:J100",
  });

  const rows = res.data.values ?? [];

  const members = await Promise.all(
    rows.map(async (row, i) => {
      const subjects = {
        git: Number(row[2]) || 0,
        html_css: Number(row[3]) || 0,
        javascript: Number(row[4]) || 0,
        react: Number(row[5]) || 0,
        php: Number(row[6]) || 0,
        java: Number(row[7]) || 0,
      };

      // 合計progressは各科目の平均
      const values = Object.values(subjects);
      const progress = Math.round(
        values.reduce((s, v) => s + v, 0) / values.length,
      );

      const githubUsername = row[9] ?? "";
      const commits = githubUsername ? await getCommitCount(githubUsername) : 0;

      return {
        id: String(i),
        position: row[0] ?? "",
        name: row[1] ?? "",
        progress,
        subjects,
        commits,
      };
    }),
  );

  return members;
}
