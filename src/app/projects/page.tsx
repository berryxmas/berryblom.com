import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description: "AI-powered products and companies built by Berry Blom.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="animate-fade-up py-14">
      <header className="mb-12 max-w-[40rem]">
        <h1 className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-medium tracking-tight">
          Projects
        </h1>
        <p className="mt-3 text-[16px] leading-relaxed text-[var(--ink-muted)]">
          Products I have shipped, from email to landing pages.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
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
          <p className="text-sm text-[var(--ink-muted)]">
            No projects yet. Check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
