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
    if (items[0]) setActiveId(items[0].id);
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const updateActive = () => {
      const offset = 120;
      let current = headings[0]?.id ?? "";

      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) {
          current = heading.id;
        }
      }

      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 48;
      if (scrolledToBottom) {
        current = headings[headings.length - 1]?.id ?? current;
      }

      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc" aria-label="On this page">
      <p className="eyebrow mb-3">On this page</p>
      <ul className="toc-list">
        {headings.map(({ id, text, level }) => {
          const active = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`toc-link${level === 3 ? " is-h3" : ""}${active ? " is-active" : ""}`}
                aria-current={active ? "true" : undefined}
              >
                {text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
