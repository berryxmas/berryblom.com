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
      <section className="py-14 animate-fade-up">
        <h1
          className="tracking-tight mb-3"
          style={{
            fontFamily: '"Lora", serif',
            fontWeight: 500,
            fontSize: "clamp(28px, 5vw, 40px)",
            lineHeight: 1.2,
          }}
        >
          Helping businesses use{" "}
          <span style={{ color: "var(--terracotta)" }}>AI</span>
          <br />
          to save money &amp; reclaim their time.
        </h1>

        <div className="mt-5 flex items-start gap-4 sm:gap-5">
          <div
            className="relative w-[104px] shrink-0 overflow-hidden rounded-[18px] border shadow-[0_18px_30px_rgba(42,37,32,0.12)] sm:w-[112px]"
            style={{
              aspectRatio: "674 / 1198",
              backgroundColor: "var(--paper-dark)",
              borderColor: "rgba(196, 94, 58, 0.14)",
            }}
          >
            <Image
              src="/berry-profile-picture.JPG"
              alt="Berry Blom"
              fill
              sizes="(min-width: 640px) 112px, 104px"
              className="object-cover"
              priority
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-9"
              style={{
                background:
                  "linear-gradient(to top, rgba(42,37,32,0.18), rgba(42,37,32,0))",
              }}
            />
          </div>

          <p
            className="max-w-lg min-w-0 pt-1 text-base leading-relaxed"
            style={{
              color: "var(--ink-muted)",
            }}
          >
            Data &amp; AI Engineer, entrepreneur. From Amsterdam, based on Lisbon. I build tools and systems that make AI work in practice.
          </p>
        </div>

        <SubscribeForm />
      </section>

      {/* Projects */}
      <section className="py-14 border-t animate-fade-up animate-delay-1" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="text-xl tracking-tight"
            style={{ fontFamily: '"Lora", serif', fontWeight: 500, color: "var(--ink-faint)" }}
          >
            Projects
          </h2>
          <a
            href="/projects"
            className="text-sm transition-colors duration-200"
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
      <section className="py-14 border-t animate-fade-up animate-delay-2" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-baseline justify-between mb-6">
          <h2
            className="text-xl tracking-tight"
            style={{ fontFamily: '"Lora", serif', fontWeight: 500 }}
          >
            Writing
          </h2>
          <a
            href="/blog"
            className="text-sm transition-colors duration-200"
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
              className="block group"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-medium text-sm group-hover:text-(--terracotta) transition-colors duration-200">
                  {post.title}
                </span>
                <time
                  dateTime={post.date}
                  className="text-xs shrink-0"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {formatDate(post.date)}
                </time>
              </div>
              <p className="text-sm mt-1" style={{ color: "var(--ink-muted)" }}>
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
