import { getMembers } from "@/lib/sheets";
import ProgressBadge from "./badge";
import Link from "next/link";

const subjectLabels: Record<string, string> = {
  git: "Git",
  html_css: "HTML / CSS",
  javascript: "JavaScript",
  react: "React",
  php: "PHP",
  java: "Java",
};

const barColor = (p: number) => {
  if (p === 100) return "bg-green-500";
  if (p >= 50) return "bg-blue-500";
  if (p > 0) return "bg-amber-400";
  return "bg-gray-200";
};

const pctColor = (p: number) => {
  if (p === 100) return "text-green-600";
  if (p >= 50) return "text-blue-500";
  if (p > 0) return "text-amber-500";
  return "text-gray-300";
};

export default async function Detail({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const members = await getMembers();
  const member = members.find((m) => m.name === name);

  if (!member) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] p-8">
        <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Member not found
          </h1>
          <p className="text-sm text-gray-500">
            {name} に該当するメンバーは見つかりませんでした。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] p-8">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* 戻るボタン */}
        <Link
          href="/"
          className="text-xs font-mono text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← BACK TO LIST
        </Link>
        {/* バッジ */}
        <ProgressBadge progress={member.progress} />
        {/* メインカード */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <p className="text-[11px] text-gray-400 font-mono mb-2 tracking-widest">
            MEMBER DETAIL
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {member.name}
          </h1>
          <p className="text-sm text-gray-400 font-mono mb-6">
            {member.position} · {member.commits} commits
          </p>

          {/* 合計progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-mono text-gray-400">
                OVERALL PROGRESS
              </p>
              <span
                className={`text-sm font-mono font-bold ${pctColor(member.progress)}`}
              >
                {member.progress}%
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${barColor(member.progress)}`}
                style={{ width: `${member.progress}%` }}
              />
            </div>
          </div>

          {/* 科目別progress */}
          <p className="text-xs font-mono text-gray-400 mb-4">SUBJECTS</p>
          <div className="space-y-4">
            {Object.entries(member.subjects).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm font-semibold text-gray-700">
                    {subjectLabels[key]}
                  </p>
                  <span
                    className={`text-xs font-mono font-medium ${pctColor(val)}`}
                  >
                    {val}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColor(val)}`}
                    style={{ width: `${val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
