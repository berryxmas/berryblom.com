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
      className="block rounded-[10px] border p-6 transition-all duration-200"
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
      <div className="mb-[9px] flex items-start justify-between">
        <a
          href={`/projects/${slug}`}
          className="text-[17px] transition-colors duration-200 hover:text-(--terracotta)"
          style={{ color: "var(--ink)", fontFamily: '"Lora", serif', fontWeight: 500 }}
        >
          {title}
        </a>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 hover:text-(--terracotta)"
            style={{ color: "var(--ink-faint)", fontSize: "15px" }}
          >
            &#8599;
          </a>
        )}
      </div>
      <p className="text-[13.5px] leading-[1.6]" style={{ color: "var(--ink-muted)" }}>
        {description}
      </p>
      {tag && (
        <span
          className="mt-[14px] inline-block rounded-[4px] px-[9px] py-[3px] text-[10.5px] uppercase tracking-[0.09em]"
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
