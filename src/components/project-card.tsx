"use client";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  status: string;
  tag?: string;
  url?: string;
}

export function ProjectCard({ slug, title, description, tag, url }: ProjectCardProps) {
  return (
    <div
      className="block p-5 rounded-lg border transition-all duration-200"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--paper-dark)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.borderColor = "var(--terracotta-light)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <a
          href={`/projects/${slug}`}
          className="font-medium text-sm transition-colors duration-200 hover:text-(--terracotta)"
          style={{ color: "var(--ink)" }}
        >
          {title}
        </a>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 hover:text-(--terracotta)"
            style={{ color: "var(--ink-muted)" }}
          >
            &#8599;
          </a>
        )}
      </div>
      <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
        {description}
      </p>
      {tag && (
        <span
          className="inline-block text-xs px-2 py-0.5 rounded-full mt-2"
          style={{
            backgroundColor: "var(--terracotta-pale)",
            color: "var(--terracotta)",
          }}
        >
          {tag}
        </span>
      )}
    </div>
  );
}
