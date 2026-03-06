"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState("");
  const [headings, setHeadings] = useState<TocItem[]>([]);

  useEffect(() => {
    const items: TocItem[] = [];
    const regex = /^(#{2,3})\s+(.+)$/gm;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const text = match[2];
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      items.push({ id, text, level: match[1].length });
    }
    setHeadings(items);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block fixed right-[calc(50%-520px)] top-32 w-56">
      <p
        className="text-xs font-medium uppercase tracking-wider mb-4"
        style={{ color: "var(--ink-faint)", fontFamily: '"DM Sans", sans-serif' }}
      >
        On this page
      </p>
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="block text-sm leading-snug transition-colors duration-200"
              style={{
                paddingLeft: level === 3 ? "1rem" : 0,
                color: activeId === id ? "var(--terracotta)" : "var(--ink-faint)",
                fontFamily: '"DM Sans", sans-serif',
              }}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
