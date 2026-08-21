import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { dmSans, jetbrainsMono, lora } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "Berry Blom | Building, AI, and life",
    template: "%s | Berry Blom",
  },
  description:
    "I help companies use AI, then I write about what I learned. Data and AI freelancer turned product builder, Amsterdam to Lisbon.",
  metadataBase: new URL("https://berryblom.com"),
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "Berry Blom | Building, AI, and life",
    description:
      "I help companies use AI, then I write about what I learned.",
    url: "https://berryblom.com",
    siteName: "Berry Blom",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Berry Blom | Building, AI, and life",
    description:
      "I help companies use AI, then I write about what I learned.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon_io-bb/favicon.ico", sizes: "any" },
      {
        url: "/favicon_io-bb/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon_io-bb/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/favicon_io-bb/apple-touch-icon.png",
  },
  manifest: "/favicon_io-bb/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${lora.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <div className="site-root">
            <div className="site-shell">
              <SiteHeader />
              <main>{children}</main>
            </div>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
