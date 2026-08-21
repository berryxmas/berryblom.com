---
title: RankMyLandingPage
description: AI feedback tool that scores and critiques your landing page.
tag: marketing
status: live
url: https://rankmylandingpage.com
---

## What it does

Paste your landing page URL and get an instant AI-powered audit. It scores your page on clarity, persuasion, design, and technical SEO, then gives you specific, actionable feedback to improve conversions.

## How it works

The tool takes a screenshot and extracts the page content, then runs it through a structured evaluation pipeline. Each dimension gets a score and detailed critique with concrete suggestions.

## Tech stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Next.js API routes
- **AI:** Claude for analysis, Puppeteer for screenshots
- **Hosting:** Vercel

## Lessons learned

The hardest part wasn't the AI. It was making the feedback genuinely useful. Early versions gave vague advice like "improve your headline." After weeks of prompt iteration, the tool now gives feedback specific enough to act on immediately.
