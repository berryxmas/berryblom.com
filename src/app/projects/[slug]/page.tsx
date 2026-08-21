import type { Metadata } from "next";
import { getProject, getProjects } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { ProductPreview } from "@/components/product-preview";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      url: `/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="animate-fade-up py-14">
      <article className="reading-col">
        <Link
          href="/projects"
          className="mb-8 inline-block text-sm text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--terracotta)]"
        >
          ← Projects
        </Link>

        <div className="mb-8">
          <ProductPreview slug={project.slug} />
        </div>

        <h1 className="font-serif text-[clamp(1.85rem,4.4vw,2.75rem)] leading-[1.18] font-medium tracking-tight">
          {project.title}
        </h1>

        <p className="mt-3 text-[17px] leading-relaxed text-[var(--ink-muted)]">
          {project.description}
        </p>

        <div className="mt-5 mb-12 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[var(--terracotta-pale)] px-2.5 py-1 text-xs text-[var(--terracotta)]">
            {project.status}
          </span>
          {project.tag && (
            <span className="text-xs uppercase tracking-[0.1em] text-[var(--ink-faint)]">
              {project.tag}
            </span>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--terracotta)] px-3 py-1 text-xs text-[var(--terracotta)] transition-colors duration-200 hover:bg-[var(--terracotta-pale)]"
            >
              Visit site →
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--ink)]"
            >
              GitHub
            </a>
          )}
        </div>

        <MdxContent source={project.content} />
      </article>
    </div>
  );
}
