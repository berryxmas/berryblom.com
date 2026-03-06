# PRD — berryblom.com

**Version:** 1.0  
**Author:** Berry Blom  
**Status:** In progress

---

## 1. Goal

A minimal personal website that positions Berry Blom as a builder and AI engineer. The site should communicate expertise through work and writing — not through claims. No mention of freelancing or availability for hire.

**North star:** When someone Googles "Berry Blom", they land on a site that immediately communicates who he is, what he has built, and that he knows what he's talking about.

---

## 2. Non-goals

- No portfolio/hire-me positioning
- No client work or case studies
- No pricing or service pages
- No complex CMS — content lives in MDX files in the repo
- No dashboard or admin UI

---

## 3. Target audience

- Potential co-founders and investors
- Other builders in the AI space
- People who discover Berry through his writing or projects

---

## 4. Pages & routes

| Route | Description |
|---|---|
| `/` | Homepage — hero, projects (2–3), recent posts (2–3), email subscribe |
| `/projects` | All projects |
| `/projects/[slug]` | Individual project detail page |
| `/blog` | All blog posts |
| `/blog/[slug]` | Individual post with floating TOC sidebar |
| `/llms.txt` | Plain text file for AI search crawlers |

---

## 5. Homepage sections

### Hero
- Small round profile photo (or placeholder avatar)
- Name: **Berry Blom**
- Tagline: *"Helping businesses use AI to save money & reclaim their time."*
- Sub-copy: Data & AI Engineer based in Lisbon.
- Email subscribe input + button

### Projects
- Show 2–3 featured projects
- "View all →" link to `/projects`

### Writing
- Show 2–3 most recent posts
- "View all →" link to `/blog`

### Footer
- Copyright
- Links: LinkedIn, GitHub, Email

---

## 6. Blog post page

- Back link to `/blog`
- Title, date, tags
- MDX content with code block support (syntax highlighting)
- **Floating TOC sidebar** — visible on screens wider than 1200px, scrolls with the page, highlights the active heading
- TOC is auto-generated from `##` and `###` headings in the post

---

## 7. Project page

- Back link to `/projects`
- Title, one-line description, tag, status badge (`live` / `beta` / `archived`)
- Visit site button + GitHub button (if available)
- MDX content — what it does, how it works, tech stack, lessons learned

---

## 8. Content structure

All content lives in the `/content` directory as MDX files. No database, no CMS.

### Adding a blog post

Create `/content/blog/your-post-slug.md`:

```markdown
---
title: Your post title
date: 2025-03-01
description: One-line summary shown in post list and used for SEO meta description.
tags: [ai, engineering]
---

## First heading

Your content here. Code blocks, blockquotes, lists all supported.
```

### Adding a project

Create `/content/projects/your-project-slug.md`:

```markdown
---
title: Project Name
description: One sentence about what it does.
tag: productivity
status: live
url: https://yoursite.com
github: https://github.com/you/repo
---

Your project write-up in markdown here.
```

Headings `##` and `###` are automatically picked up for the TOC on blog posts.

---

## 9. Design system

### Colors

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#F4EFE4` | Page background |
| `--paper-dark` | `#EDE6D6` | Cards, inputs |
| `--ink` | `#2A2520` | Primary text |
| `--ink-muted` | `#7A6F62` | Body text, descriptions |
| `--ink-faint` | `#B5A99A` | Labels, dates, placeholders |
| `--terracotta` | `#C45E3A` | Accent — links, hover, tags |
| `--terracotta-light` | `#E8845F` | Hover borders, focus states |
| `--terracotta-pale` | `rgba(196,94,58,0.09)` | Tag backgrounds |
| `--border` | `#DDD5C5` | Dividers, card borders |

### Typography

| Usage | Font | Weight |
|---|---|---|
| Display / headings | Lora (serif) | 400, 500 |
| Body / UI | DM Sans | 300, 400, 500 |
| Code | JetBrains Mono | 400 |

### Grain texture
Subtle SVG noise overlay using `feTurbulence` on a fixed `::before` pseudo-element. Opacity ~0.035. Gives the page a papery feel.

### Spacing
- Max content width: `640px`, centered
- Page horizontal padding: `28px`
- Section vertical padding: `56px`

### Motion
- Page load: `fadeUp` animation (opacity 0→1, translateY 16px→0, 0.75s ease)
- Staggered delays on sections: 0s, 0.08s, 0.16s
- Card hover: `translateY(-2px)`, border-color transition

---

## 10. Mobile responsiveness

| Breakpoint | Behaviour |
|---|---|
| `< 500px` | Email form stacks vertically. Footer stacks vertically. |
| `< 1200px` | TOC sidebar hidden (only visible on wide screens) |
| All sizes | Single-column layout, fluid typography with `clamp()` |

Hero h1 uses `clamp(26px, 5vw, 36px)` for fluid sizing.

---

## 11. Tech stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 15** (App Router) |
| Language | TypeScript |
| Styling | CSS variables + Tailwind utilities |
| Markdown | `gray-matter` for frontmatter, `next-mdx-remote` for rendering |
| Fonts | Google Fonts (Lora, DM Sans) |
| Hosting | **Vercel** |
| Email subscribe | Resend (API route `/api/subscribe`) |

---

## 12. SEO

### Metadata
Every page exports a `generateMetadata()` function with:
- `title` — page-specific, e.g. `"Why AI tools fail in production | Berry Blom"`
- `description` — pulled from post/project frontmatter `description` field
- `openGraph` — title, description, type, url
- `twitter` — card type, title, description

### Sitemap
Auto-generated via `app/sitemap.ts` using Next.js built-in sitemap support. Includes all blog posts and project pages with `lastModified` from file dates.

### robots.txt
```
User-agent: *
Allow: /

Sitemap: https://berryblom.com/sitemap.xml
```

### Semantic HTML
- Single `<h1>` per page
- `<article>` for blog posts and project pages
- `<nav>` for navigation
- `<time>` element with `dateTime` attribute for post dates

### Performance
- Static generation (`generateStaticParams`) for all blog and project pages
- Fonts loaded via `<link rel="preconnect">` + `display=swap`
- No client-side JS except for TOC scroll tracking and email form

---

## 13. llms.txt

A plain text file at `/llms.txt` (served from the `public/` folder) for AI search crawlers like Perplexity, ChatGPT search, and Claude.

```
# Berry Blom

Berry Blom is a Data & AI Engineer based in Lisbon, Portugal.
He builds AI-powered tools and systems that help businesses save money and reclaim time.

## Projects

- Mailreplai (https://mailreplai.com): AI-powered Outlook add-in for drafting email replies
- RankMyLandingPage (https://rankmylandingpage.com): AI feedback tool for landing pages

## Writing

Berry writes about AI engineering, building products, and lessons from shipping software.

## Contact

- Website: https://berryblom.com
- LinkedIn: https://linkedin.com/in/berryblom
- GitHub: https://github.com/berryblom
- Email: hello@berryblom.com
```

---

## 14. Email subscribe

- Input + button in hero section
- On submit: POST to `/api/subscribe` with `{ email }`
- API route calls Resend to add subscriber to audience
- Success state: inline confirmation message, no page reload
- No popup, no modal, no separate page

---

## 15. Future additions (not in v1)

- Research paper post (domain adaptation, presented in Évora)
- `/uses` page — tools and stack Berry uses daily
- YouTube video embeds when NeuroPage goes public
- Dark mode toggle
- RSS feed at `/feed.xml`