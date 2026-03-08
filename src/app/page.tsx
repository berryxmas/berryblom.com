import { getBlogPosts, getProjects } from "@/lib/content";
import { SubscribeForm } from "@/components/subscribe-form";
import { ProjectCard } from "@/components/project-card";
import Image from "next/image";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Home() {
  const posts = getBlogPosts().slice(0, 3);
  const projects = getProjects().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="animate-fade-up py-[76px]">
        <h1
          className="mb-[18px] tracking-tight"
          style={{
            fontFamily: '"Lora", serif',
            fontWeight: 400,
            fontSize: "clamp(26px, 5vw, 36px)",
            lineHeight: 1.28,
            letterSpacing: "-0.015em",
          }}
        >
          Helping businesses use{" "}
          <span style={{ color: "var(--terracotta)" }}>AI</span>
          <br />
          to save money &amp; reclaim their time.
        </h1>

        <div className="mb-10 flex max-w-[400px] items-start gap-4">
          <div
            className="relative w-[82px] shrink-0 overflow-hidden rounded-[14px] border shadow-[0_10px_20px_rgba(42,37,32,0.08)]"
            style={{
              aspectRatio: "674 / 1198",
              backgroundColor: "var(--paper-dark)",
              borderColor: "var(--border)",
            }}
          >
            <Image
              src="/berry-profile-picture.JPG"
              alt="Berry Blom"
              fill
              sizes="82px"
              className="object-cover"
              priority
            />
          </div>
          <p
            className="pt-1 text-[15px] leading-[1.65]"
            style={{
              color: "var(--ink-muted)",
            }}
          >
            Data &amp; AI Engineer, entrepreneur. From Amsterdam, based in Lisbon. I build tools and systems that make AI work in practice.
          </p>
        </div>

        <SubscribeForm />
      </section>

      {/* Projects */}
      <section className="border-t py-14 animate-fade-up animate-delay-1" style={{ borderColor: "var(--border)" }}>
        <div className="mb-7 flex items-baseline justify-between">
          <span
            className="text-[10.5px] uppercase tracking-[0.15em]"
            style={{ color: "var(--ink-faint)" }}
          >
            Projects
          </span>
          <a
            href="/projects"
            className="text-[12px] transition-opacity duration-200 hover:opacity-70"
            style={{ color: "var(--terracotta)" }}
          >
            View all &rarr;
          </a>
        </div>
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
              Projects coming soon.
            </p>
          )}
        </div>
      </section>

      {/* Writing */}
      <section className="border-t py-14 animate-fade-up animate-delay-2" style={{ borderColor: "var(--border)" }}>
        <div className="mb-7 flex items-baseline justify-between">
          <span
            className="text-[10.5px] uppercase tracking-[0.15em]"
            style={{ color: "var(--ink-faint)" }}
          >
            Writing
          </span>
          <a
            href="/blog"
            className="text-[12px] transition-opacity duration-200 hover:opacity-70"
            style={{ color: "var(--terracotta)" }}
          >
            View all &rarr;
          </a>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border-b py-[19px] first:border-t group"
              style={{ borderColor: "var(--border)" }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className="transition-colors duration-200 group-hover:text-(--terracotta)"
                  style={{ fontFamily: '"Lora", serif', fontSize: "16px", fontWeight: 400 }}
                >
                  {post.title}
                </span>
                <time
                  dateTime={post.date}
                  className="shrink-0 text-xs"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {formatDate(post.date)}
                </time>
              </div>
              <p className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
                {post.description}
              </p>
            </a>
          ))}
          {posts.length === 0 && (
            <p className="text-sm" style={{ color: "var(--ink-faint)" }}>
              Posts coming soon.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
