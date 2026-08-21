import Link from "next/link";
import { TagList } from "@/components/tag-list";
import { formatDate, readingTimeLabel } from "@/lib/format";
import type { BlogPost } from "@/lib/content";

export function PostTeaser({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <article className={featured ? "post-teaser is-featured" : "post-teaser"}>
      {featured && <span className="eyebrow">Latest</span>}
      <div className="mt-0 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <h2
          className={`font-serif tracking-tight ${
            featured
              ? "mt-4 text-[clamp(1.6rem,3.4vw,2.25rem)] leading-[1.2]"
              : "text-[1.2rem]"
          }`}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="transition-colors duration-200 hover:text-[var(--terracotta)]"
          >
            {post.title}
          </Link>
        </h2>
        <time
          dateTime={post.date}
          className="shrink-0 text-[13px] text-[var(--ink-muted)]"
        >
          {formatDate(post.date, featured ? "long" : "short")}
        </time>
      </div>
      <p
        className={`mt-2 max-w-[62ch] leading-relaxed text-[var(--ink-muted)] ${
          featured ? "text-[16px]" : "text-[15px]"
        }`}
      >
        {post.description}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="text-[12px] text-[var(--ink-faint)]">
          {readingTimeLabel(post.readingTime)}
        </span>
        <TagList tags={post.tags} />
      </div>
    </article>
  );
}
