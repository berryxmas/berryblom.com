import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    default: "Berry Blom — Data & AI Engineer",
    template: "%s | Berry Blom",
  },
  description:
    "Berry Blom is a Data & AI Engineer based in Lisbon. Building AI-powered tools that help businesses save money and reclaim time.",
  metadataBase: new URL("https://berryblom.com"),
  openGraph: {
    title: "Berry Blom — Data & AI Engineer",
    description:
      "Building AI-powered tools that help businesses save money and reclaim time.",
    url: "https://berryblom.com",
    siteName: "Berry Blom",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Berry Blom — Data & AI Engineer",
    description:
      "Building AI-powered tools that help businesses save money and reclaim time.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon_io-bb/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon_io-bb/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon_io-bb/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon_io-bb/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon_io-bb/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400&family=Lora:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="mx-auto max-w-[640px] px-7">
          <nav className="flex items-center justify-between pt-9 animate-fade-up">
            <a
              href="/"
              aria-label="Berry Blom home"
              className="-ml-3 block h-[48px] w-[48px] shrink-0 transition-transform duration-200 hover:scale-[1.03]"
            >
              <Image
                src="/wax-seal-bb.png"
                alt="Berry Blom wax seal"
                width={1024}
                height={576}
                priority
                className="h-full w-full object-contain"
              />
            </a>
            <div className="flex gap-7 text-[13px]" style={{ color: "var(--ink-muted)", letterSpacing: "0.03em" }}>
              <a
                href="/projects"
                className="transition-colors duration-200 hover:text-(--terracotta)"
              >
                Projects
              </a>
              <a
                href="/blog"
                className="transition-colors duration-200 hover:text-(--terracotta)"
              >
                Writing
              </a>
            </div>
          </nav>
          <main>{children}</main>
          <footer
            className="animate-fade-up animate-delay-4 border-t py-10 mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
            style={{
              borderColor: "var(--border)",
              color: "var(--ink-faint)",
            }}
          >
            <span>&copy; {new Date().getFullYear()} Berry Blom</span>
            <div className="flex gap-5">
              <a
                href="https://linkedin.com/in/berry-blom"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-(--terracotta)"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/berryxmas"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-(--terracotta)"
              >
                GitHub
              </a>
              <a
                href="mailto:hello@berryblom.com"
                className="transition-colors duration-200 hover:text-(--terracotta)"
              >
                Email
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
