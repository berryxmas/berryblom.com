import { getBlogPost } from "@/lib/content";
import { createOgImage, ogSize } from "@/lib/og";

export const alt = "Berry Blom writing";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  return createOgImage({
    title: post?.title ?? "Writing",
    eyebrow: "Writing",
  });
}
