import Link from "next/link";
import type { BlogPost } from "@/lib/content";

export function PostPager({
  newer,
  older,
}: {
  newer?: Pick<BlogPost, "slug" | "title">;
  older?: Pick<BlogPost, "slug" | "title">;
}) {
  if (!newer && !older) return null;

  return (
    <nav
      className="mt-16 grid gap-6 border-t border-[var(--border)] pt-8 sm:grid-cols-2"
      aria-label="More writing"
    >
      {older ? (
        <Link href={`/blog/${older.slug}`} className="group block">
          <span className="eyebrow">Older</span>
          <span className="mt-2 block font-serif text-lg leading-snug transition-colors duration-200 group-hover:text-[var(--terracotta)]">
            {older.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {newer ? (
        <Link href={`/blog/${newer.slug}`} className="group block sm:text-right">
          <span className="eyebrow">Newer</span>
          <span className="mt-2 block font-serif text-lg leading-snug transition-colors duration-200 group-hover:text-[var(--terracotta)]">
            {newer.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
