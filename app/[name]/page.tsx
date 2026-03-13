import { getMembers } from "@/lib/sheets";
import ProgressBadge from "./badge";

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
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <p className="text-[11px] text-gray-400 font-mono mb-2 tracking-widest">
            MEMBER DETAIL
          </p>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {member.name}
          </h1>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-mono text-gray-400 mb-1">POSITION</p>
              <p className="text-base font-semibold text-gray-800">
                {member.position}
              </p>
            </div>

            <div>
              <p className="text-xs font-mono text-gray-400 mb-1">PROGRESS</p>
              <p className="text-base font-semibold text-gray-800">
                {member.progress}%
              </p>
            </div>

            <div>
              <p className="text-xs font-mono text-gray-400 mb-1">COMMITS</p>
              <p className="text-base font-semibold text-gray-800">
                {member.commits}
              </p>
            </div>
          </div>
        </div>

        <ProgressBadge progress={member.progress} />
      </div>
    </div>
  );
}
