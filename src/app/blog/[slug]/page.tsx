import type { Metadata } from "next";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { TableOfContents } from "@/components/toc";
import { notFound } from "next/navigation";

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
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <div className="animate-fade-up">
      <TableOfContents content={post.content} />
      <article className="py-14">
        <a
          href="/blog"
          className="text-sm inline-block mb-8 hover:text-[var(--terracotta)] transition-colors duration-200"
          style={{ color: "var(--ink-faint)" }}
        >
          &larr; Back to blog
        </a>

        <h1
          className="tracking-tight mb-3"
          style={{
            fontFamily: '"Lora", serif',
            fontWeight: 500,
            fontSize: "clamp(24px, 4.5vw, 32px)",
            lineHeight: 1.25,
          }}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-3 mb-10">
          <time
            dateTime={post.date}
            className="text-sm"
            style={{ color: "var(--ink-faint)" }}
          >
            {formatDate(post.date)}
          </time>
          {post.tags.length > 0 && (
            <>
              <span style={{ color: "var(--border)" }}>&middot;</span>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--terracotta-pale)",
                      color: "var(--terracotta)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <MdxContent source={post.content} />
      </article>
    </div>
  );
}
