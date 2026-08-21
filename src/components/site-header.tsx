"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/projects", label: "Projects", match: "/projects" },
  { href: "/blog", label: "Writing", match: "/blog" },
  { href: "/about", label: "About", match: "/about" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link href="/" aria-label="Berry Blom home" className="site-logo">
        <Image
          src="/wax-seal-bb.png"
          alt="Berry Blom wax seal"
          width={1024}
          height={576}
          priority
          className="h-full w-full object-contain"
        />
      </Link>

      <nav className="site-nav" aria-label="Primary">
        {links.map((link) => {
          const active = pathname.startsWith(link.match);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`site-nav-link${active ? " is-active" : ""}`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <ThemeToggle />
    </header>
  );
}
