import Link from "next/link";
import { ProductPreview } from "@/components/product-preview";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  status: string;
  tag?: string;
  url?: string;
}

export function ProjectCard({
  slug,
  title,
  description,
  status,
  tag,
  url,
}: ProjectCardProps) {
  return (
    <article className="project-tile group">
      <ProductPreview slug={slug} />
      <div className="mt-5 flex items-start justify-between gap-3">
        <Link
          href={`/projects/${slug}`}
          className="font-serif text-[1.35rem] leading-snug tracking-tight transition-colors duration-200 group-hover:text-[var(--terracotta)]"
        >
          {title}
        </Link>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${title}`}
            className="mt-1 shrink-0 text-[var(--ink-faint)] transition-colors duration-200 hover:text-[var(--terracotta)]"
          >
            ↗
          </a>
        )}
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-[var(--ink-muted)]">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-2">
        <span className="rounded-[4px] bg-[var(--terracotta-pale)] px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.1em] text-[var(--terracotta)]">
          {status}
        </span>
        {tag && (
          <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--ink-faint)]">
            {tag}
          </span>
        )}
      </div>
    </article>
  );
}
