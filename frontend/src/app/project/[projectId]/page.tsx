import ChatBox from "@/components/project/chatBox";

export default async function ProjectPage({}: {
  params: Promise<{ projectId: string }>;
}) {
  return (
    <>
      <ChatBox />
    </>
  );
}
