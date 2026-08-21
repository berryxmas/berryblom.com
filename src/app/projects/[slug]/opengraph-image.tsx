import { getProject } from "@/lib/content";
import { createOgImage, ogSize } from "@/lib/og";

export const alt = "Berry Blom project";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  return createOgImage({
    title: project?.title ?? "Projects",
    eyebrow: "Projects",
  });
}
