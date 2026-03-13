import { Member } from "@/types/member";

const members: Member[] = [
  { id: 1, position: "エンジニア", name: "handa", progress: 100, commits: 100 },
  { id: 2, position: "エンジニア", name: "kuromi", progress: 10, commits: 1 },
  { id: 3, position: "エンジニア", name: "takahashi", progress: 0, commits: 0 },
  {
    id: 4,
    position: "エンジニア",
    name: "sakurada",
    progress: 50,
    commits: 50,
  },
];

export default function StudyTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>ポジション</th>
          <th>氏名</th>
          <th>研修完了</th>
          <th>コミット数</th>
        </tr>
      </thead>
      <tbody>
        {members.map((m) => (
          <tr key={m.id}>
            <td>{m.position}</td>
            <td>{m.name}</td>
            <td>{m.progress}%</td>
            <td>{m.commits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
