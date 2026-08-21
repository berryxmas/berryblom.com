import { getBlogPosts, getProjects } from "@/lib/content";
import { SubscribeForm } from "@/components/subscribe-form";
import { ProjectCard } from "@/components/project-card";
import { PostTeaser } from "@/components/post-teaser";
import { LogoCloud } from "@/components/logo-cloud";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const posts = getBlogPosts().slice(0, 3);
  const projects = getProjects().slice(0, 4);

  return (
    <div>
      <section className="hero animate-fade-up">
        <h1 className="hero-title">
          I help companies use AI,
          <br />
          then I write about what I learned.
        </h1>
        <div className="hero-rule" aria-hidden="true" />
        <div className="hero-about">
          <div className="hero-portrait">
            <span className="hero-portrait-plate" aria-hidden="true" />
            <div className="hero-portrait-frame">
              <Image
                src="/berry-profile-picture.JPG"
                alt="Berry Blom"
                fill
                sizes="(max-width: 640px) 108px, 148px"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="hero-copy">
            <p>
              Data and AI freelancer turned product builder. Amsterdam to
              Lisbon. Writing about what I learn along the way.
            </p>
            <Link href="/about" className="hero-more">
              Read more →
            </Link>
          </div>
        </div>
        <LogoCloud />
      </section>

      <section className="animate-fade-up animate-delay-1 border-t border-[var(--border)] pt-10 pb-16">
        <div className="mb-5 flex items-baseline justify-between">
          <span className="eyebrow">Projects</span>
          <Link
            href="/projects"
            className="text-[13px] text-[var(--terracotta)] transition-opacity duration-200 hover:opacity-70"
          >
            View all →
          </Link>
        </div>
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
        </div>
      </section>

      <section className="animate-fade-up animate-delay-2 border-t border-[var(--border)] py-16">
        <div className="mb-5 flex items-baseline justify-between">
          <span className="eyebrow">Writing</span>
          <Link
            href="/blog"
            className="text-[13px] text-[var(--terracotta)] transition-opacity duration-200 hover:opacity-70"
          >
            View all →
          </Link>
        </div>
        <div>
          {posts.map((post) => (
            <PostTeaser key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="animate-fade-up animate-delay-3 border-t border-[var(--border)] py-16">
        <span className="eyebrow">Stay in touch</span>
        <p className="mt-4 mb-6 max-w-[36ch] font-serif text-[1.45rem] leading-snug tracking-tight">
          Occasional notes on building, AI, and life.
        </p>
        <SubscribeForm />
      </section>
    </div>
  );
}
