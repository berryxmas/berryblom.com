import type { Metadata } from "next";
import { getBlogPosts, getTags } from "@/lib/content";
import { PostTeaser } from "@/components/post-teaser";
import { TagList } from "@/components/tag-list";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Notes on building, AI, and life, from a data scientist who ships products.",
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const tags = getTags();
  const [featured, ...rest] = posts;

  return (
    <div className="animate-fade-up py-14">
      <header className="mb-10 max-w-[40rem]">
        <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-medium tracking-tight">
          Writing
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-muted)]">
          Building, AI, and life. Use the tags to skip to what you came for.
        </p>
      </header>

      {tags.length > 0 && (
        <section className="mb-12" aria-label="Tags">
          <TagList tags={tags.map((tag) => tag.slug)} />
        </section>
      )}

      {featured && (
        <div className="mb-10">
          <PostTeaser post={featured} featured />
        </div>
      )}

      <div>
        {rest.map((post) => (
          <PostTeaser key={post.slug} post={post} />
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-[var(--ink-muted)]">No posts yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
}
