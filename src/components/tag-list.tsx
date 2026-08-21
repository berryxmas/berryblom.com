import Link from "next/link";
import { formatTagLabel, slugifyTag } from "@/lib/content";

export function TagList({
  tags,
  active,
}: {
  tags: string[];
  active?: string;
}) {
  if (tags.length === 0) return null;

  return (
    <ul className="tag-list">
      {tags.map((tag) => {
        const slug = slugifyTag(tag);
        const isActive = active === slug;
        return (
          <li key={slug}>
            <Link
              href={`/blog/tag/${slug}`}
              className={`tag-chip${isActive ? " is-active" : ""}`}
            >
              {formatTagLabel(tag)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
