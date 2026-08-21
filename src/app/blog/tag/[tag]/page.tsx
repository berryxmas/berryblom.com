import type { Metadata } from "next";
import { formatTagLabel, getPostsByTag, getTag, getTags } from "@/lib/content";
import { PostTeaser } from "@/components/post-teaser";
import { TagList } from "@/components/tag-list";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getTags().map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const record = getTag(tag);
  if (!record) return {};
  return {
    title: record.label,
    description: `Writing tagged ${record.label}.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const record = getTag(tag);
  const posts = getPostsByTag(tag);
  if (!record || posts.length === 0) notFound();

  return (
    <div className="animate-fade-up py-14">
      <header className="mb-10 max-w-[40rem]">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--terracotta)]"
        >
          ← Writing
        </Link>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-medium tracking-tight">
          {formatTagLabel(record.label)}
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-muted)]">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </header>

      <section className="mb-12" aria-label="Tags">
        <TagList tags={getTags().map((item) => item.slug)} active={record.slug} />
      </section>

      <div>
        {posts.map((post) => (
          <PostTeaser key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
