import { getMembers } from "@/lib/notion";
import StudyTable from "@/components/StudyTable";

export default async function Home() {
  const members = await getMembers();
  return <StudyTable members={members} />;
}
