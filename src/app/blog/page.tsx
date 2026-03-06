import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Writing about AI engineering, building products, and lessons from shipping software.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="animate-fade-up">
      <section className="py-14">
        <h1
          className="text-2xl tracking-tight mb-2"
          style={{ fontFamily: '"Lora", serif', fontWeight: 500 }}
        >
          Writing
        </h1>
        <p className="text-sm mb-10" style={{ color: "var(--ink-muted)" }}>
          Thoughts on AI engineering, building products, and shipping software.
        </p>

        <div className="space-y-6">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-medium text-sm group-hover:text-[var(--terracotta)] transition-colors duration-200">
                  {post.title}
                </span>
                <time
                  dateTime={post.date}
                  className="text-xs shrink-0"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {formatDate(post.date)}
                </time>
              </div>
              <p className="text-sm mt-1" style={{ color: "var(--ink-muted)" }}>
                {post.description}
              </p>
              {post.tags.length > 0 && (
                <div className="flex gap-2 mt-2">
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
              )}
            </a>
          ))}
          {posts.length === 0 && (
            <p className="text-sm" style={{ color: "var(--ink-faint)" }}>
              No posts yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
