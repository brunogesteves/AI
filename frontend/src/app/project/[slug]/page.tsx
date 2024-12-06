import Slug from "@/components/slug/slug.view";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  return (
    <div>
      <Slug slug={slug} />
    </div>
  );
}
