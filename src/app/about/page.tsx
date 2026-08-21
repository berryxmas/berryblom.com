import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Berry Blom is a data scientist and product builder in Lisbon. Master's from the University of Amsterdam, GPT-2 research in 2022, now building AI products for businesses.",
};

export default function AboutPage() {
  return (
    <div className="about-layout animate-fade-up">
      <div className="about-portrait hero-portrait">
        <span className="hero-portrait-plate" aria-hidden="true" />
        <div className="hero-portrait-frame">
          <Image
            src="/berry-profile-picture.JPG"
            alt="Berry Blom"
            fill
            sizes="(max-width: 720px) 128px, 168px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <article>
        <p className="eyebrow">About</p>
        <h1 className="mt-4 font-serif text-[clamp(2rem,4vw,2.75rem)] font-medium tracking-tight leading-[1.15]">
          From client work to products that ship
        </h1>

        <div className="prose mt-8">
          <p>
            I have a master&apos;s in data science from the University of
            Amsterdam. In 2022 I published research on GPT-2, before the current
            AI wave.
          </p>
          <p>
            Since then I have used AI to handle client work, help businesses
            move faster, and build products companies can actually use. That
            path took me from Amsterdam to Lisbon, and from freelancer to
            shipping my own tools.
          </p>
          <p>
            I still take on work that matters. I also write about what I learn
            while building, and about the rest of life.
          </p>
        </div>

        <p className="mt-10">
          <Link
            href="/projects"
            className="text-[15px] text-[var(--terracotta)] transition-opacity duration-200 hover:opacity-70"
          >
            See what I&apos;ve shipped →
          </Link>
        </p>
      </article>
    </div>
  );
}
