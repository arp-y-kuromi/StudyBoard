import Link from 'next/link';
import { Member } from '@/lib/sheets';
import ProgressBadge from '../app/[name]/badge';

const rankLabel = (i: number) =>
  i === 0 ? null : (['', '2nd', '3rd', '4th'][i] ?? `${i + 1}th`);

const barColor = (p: number) => {
  if (p === 100) return 'bg-green-600';
  if (p >= 50) return 'bg-blue-500';
  if (p > 0) return 'bg-amber-400';
  return 'bg-gray-200';
};

const pctColor = (p: number) => {
  if (p === 100) return 'text-green-600';
  if (p >= 50) return 'text-blue-500';
  if (p > 0) return 'text-amber-500';
  return 'text-gray-300';
};

export default function StudyTable({ members }: { members: Member[] }) {
  console.log('members:', members);
  const sorted = [...members].sort((a, b) => b.progress - a.progress);
  const avg = Math.round(
    members.reduce((s, m) => s + m.progress, 0) / members.length,
  );
  const total = members.reduce((s, m) => s + m.commits, 0);

  const progressSummary = [
    {
      label: '25+',
      count: members.filter((m) => m.progress >= 25).length,
      badge: 25,
    },
    {
      label: '50+',
      count: members.filter((m) => m.progress >= 50).length,
      badge: 50,
    },
    {
      label: '75+',
      count: members.filter((m) => m.progress >= 75).length,
      badge: 75,
    },
    {
      label: '100',
      count: members.filter((m) => m.progress >= 100).length,
      badge: 100,
    },
  ];

  console.log('progressSummary:', progressSummary);

  return (
    <div className='bg-[#f8f9fb] min-h-screen p-8 font-sans'>
      {/* ヘッダー */}
      <div className='mb-8'>
        <p className='text-[11px] text-gray-400 font-mono mb-1 tracking-widest'>
          SES TEAM / 2025
        </p>
        <h1 className='text-2xl font-bold text-gray-900'>Study Board</h1>
      </div>

      {/* サマリー */}
      <div className='grid grid-cols-3 gap-3 mb-8'>
        {[
          { label: 'MEMBERS', val: members.length, accent: false },
          { label: 'AVG PROGRESS', val: `${avg}%`, accent: true },
          { label: 'TOTAL COMMITS', val: total, accent: false },
        ].map((s) => (
          <div
            key={s.label}
            className='bg-white border border-gray-200 rounded-xl p-4'
          >
            <p className='text-[11px] font-mono text-gray-400 mb-1'>
              {s.label}
            </p>
            <p
              className={`text-xl font-bold ${
                s.accent ? 'text-blue-600' : 'text-gray-900'
              }`}
            >
              {s.val}
            </p>
          </div>
        ))}
      </div>

      {/* テーブル */}
      <div className='bg-white border border-gray-200 rounded-2xl overflow-hidden'>
        <table className='w-full border-collapse'>
          <thead>
            <tr className='border-b border-gray-100'>
              {['position', 'name', 'progress', 'commits'].map((h, i) => (
                <th
                  key={h}
                  className={`text-[11px] font-mono font-normal text-gray-300 px-4 py-3 ${
                    i >= 2 ? 'text-right' : 'text-left'
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((m, i) => (
              <tr
                key={m.id}
                className='border-b border-gray-50 last:border-none hover:bg-gray-50 transition-colors'
              >
                <td className='px-4 py-4'>
                  <span className='text-[11px] font-mono bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded'>
                    {m.position === 'エンジニア' ? 'eng' : 'des'}
                  </span>
                </td>
                <td className='px-4 py-4'>
                  <Link
                    href={`/${m.name}`}
                    className={`text-sm font-semibold flex items-center gap-1.5 hover:opacity-70 transition-opacity ${
                      i === 0 ? 'text-amber-700' : 'text-gray-800'
                    }`}
                  >
                    {i === 0 ? (
                      <span className='text-base'>👑</span>
                    ) : (
                      <span className='text-[10px] font-mono text-gray-300'>
                        {rankLabel(i)}
                      </span>
                    )}
                    {m.name}
                  </Link>
                </td>
                <td className='px-4 py-4'>
                  <div className='flex items-center gap-2 justify-end'>
                    <div className='w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden'>
                      <div
                        className={`h-full rounded-full ${barColor(
                          m.progress,
                        )}`}
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-mono font-medium w-10 text-right ${pctColor(
                        m.progress,
                      )}`}
                    >
                      {m.progress}%
                    </span>
                  </div>
                </td>
                <td
                  className={`px-4 py-4 text-right text-xs font-mono ${
                    m.commits >= 50
                      ? 'text-green-600 font-medium'
                      : m.commits > 0
                        ? 'text-gray-500'
                        : 'text-gray-200'
                  }`}
                >
                  {m.commits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* バッチ取得サマリ */}
      <div className='grid grid-cols-5 gap-4'>
        {progressSummary.map((s) => (
          <div
            key={s.label}
            className='bg-white border border-gray-200 rounded-xl p-4 flex flex-col items-center'
          >
            <p className='text-[11px] font-mono text-gray-400 mb-2'>
              {s.label}
            </p>

            {/* バッジ */}
            {s.badge >= 25 && (
              <div className='scale-50 -mb-2'>
                <ProgressBadge progress={s.badge} />
              </div>
            )}

            <p className='text-xl font-bold text-gray-900'>{s.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
