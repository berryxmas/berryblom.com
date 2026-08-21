---
title: Mailreplai
description: AI-powered Outlook add-in that drafts email replies in your tone.
tag: productivity
status: live
url: https://mailreplai.com
---

## What it does

Mailreplai is an Outlook add-in that reads incoming emails and generates reply drafts that match your personal writing style. One click to draft, one click to send.

## How it works

The add-in injects a sidebar into Outlook. When you open an email, it analyzes the context and generates a contextually relevant reply. Over time it learns your tone, preferred sign-offs, and level of formality.

## Tech stack

- **Frontend:** React + Office.js (Outlook Add-in SDK)
- **Backend:** Python FastAPI
- **AI:** OpenAI GPT-4 with fine-tuned prompt chains
- **Infrastructure:** Azure Functions, Cosmos DB

## Lessons learned

Building for Outlook's add-in ecosystem is not for the faint of heart. The sandboxing model is restrictive, and testing across Outlook Web, Desktop (Windows), and Mac requires patience. But the distribution advantage of being inside the inbox, where people spend hours daily, makes it worth it.
