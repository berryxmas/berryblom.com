import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI-powered tools and systems built by Berry Blom.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="animate-fade-up">
      <section className="py-14">
        <h1
          className="text-2xl tracking-tight mb-2"
          style={{ fontFamily: '"Lora", serif', fontWeight: 500 }}
        >
          Projects
        </h1>
        <p className="text-sm mb-10" style={{ color: "var(--ink-muted)" }}>
          Things I&apos;ve built.
        </p>

        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.description}
              status={project.status}
              tag={project.tag}
              url={project.url}
            />
          ))}
          {projects.length === 0 && (
            <p className="text-sm" style={{ color: "var(--ink-faint)" }}>
              No projects yet. Check back soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
