import { getMembers } from "@/lib/sheets";
import StudyTable from "@/components/StudyTable";

export default async function Home() {
  const members = await getMembers();
  return <StudyTable members={members} />;
}
