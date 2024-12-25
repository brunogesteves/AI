import ChatBox from "@/components/slug/chatBox";

export default async function ProjectPage({}: // params,
{
  params: Promise<{ slug: string }>;
}) {
  // const slug = (await params).slug;

  return (
    <>
      <ChatBox />
    </>
  );
}
