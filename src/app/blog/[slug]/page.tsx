import type { Metadata } from "next";
import { getAdjacentPosts, getBlogPost, getBlogPosts } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { TableOfContents } from "@/components/toc";
import { PostPager } from "@/components/post-pager";
import { TagList } from "@/components/tag-list";
import { formatDate, readingTimeLabel } from "@/lib/format";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${slug}`,
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const { newer, older } = getAdjacentPosts(slug);

  return (
    <div className="blog-layout animate-fade-up">
      <header className="blog-header">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--terracotta)]"
        >
          ← Writing
        </Link>

        <h1 className="font-serif text-[clamp(1.85rem,4.4vw,2.75rem)] leading-[1.18] font-medium tracking-tight">
          {post.title}
        </h1>

        <div className="mt-5 mb-2 flex flex-wrap items-center gap-3 text-[14px] text-[var(--ink-muted)]">
          <time dateTime={post.date}>{formatDate(post.date, "long")}</time>
          <span aria-hidden="true">·</span>
          <span>{readingTimeLabel(post.readingTime)}</span>
        </div>
        <TagList tags={post.tags} />
      </header>

      <TableOfContents content={post.content} />

      <div className="blog-body">
        <MdxContent source={post.content} />
        <PostPager newer={newer} older={older} />
      </div>
    </div>
  );
}
