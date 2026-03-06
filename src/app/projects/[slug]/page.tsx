import type { Metadata } from "next";
import { getProject, getProjects } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { notFound } from "next/navigation";

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
    <div className="animate-fade-up">
      <article className="py-14">
        <a
          href="/projects"
          className="text-sm transition-colors duration-200 inline-block mb-8"
          style={{ color: "var(--ink-faint)" }}
        >
          &larr; Back to projects
        </a>

        <h1
          className="tracking-tight mb-2"
          style={{
            fontFamily: '"Lora", serif',
            fontWeight: 500,
            fontSize: "clamp(24px, 4.5vw, 32px)",
            lineHeight: 1.25,
          }}
        >
          {project.title}
        </h1>

        <p className="text-sm mb-4" style={{ color: "var(--ink-muted)" }}>
          {project.description}
        </p>

        <div className="flex items-center gap-3 mb-10">
          <span
            className="text-xs px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "var(--terracotta-pale)",
              color: "var(--terracotta)",
            }}
          >
            {project.status}
          </span>
          {project.tag && (
            <span className="text-xs" style={{ color: "var(--ink-faint)" }}>
              {project.tag}
            </span>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1 rounded-full border transition-colors duration-200"
              style={{
                borderColor: "var(--terracotta)",
                color: "var(--terracotta)",
              }}
            >
              Visit site &rarr;
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1 rounded-full border transition-colors duration-200"
              style={{
                borderColor: "var(--border)",
                color: "var(--ink-muted)",
              }}
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
