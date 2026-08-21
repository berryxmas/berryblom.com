---
title: Building an Outlook add-in with React
date: 2025-10-22
description: What I learned building Mailreplai, an AI email assistant that lives inside Outlook.
tags: [engineering, react]
---

## Why Outlook

Email is where knowledge workers spend 2-3 hours per day. Building inside the inbox means zero friction: no new tab, no context switch, no "I'll try that tool later." The distribution advantage is massive.

## The Office.js SDK

Microsoft's Office.js SDK is the gateway to building Outlook add-ins. It provides APIs to read email content, compose replies, and render custom task panes inside the Outlook UI.

The good: it works across Outlook Web, Desktop (Windows and Mac), and mobile. The bad: each platform has subtle differences that will drive you mad.

### Setting up the task pane

The add-in renders in an iframe-like sandbox. You define a manifest file that tells Outlook where to load your React app and what permissions it needs.

```xml
<Action xsi:type="ShowTaskpane">
  <TaskpaneId>mailreplai-pane</TaskpaneId>
  <SourceLocation resid="Taskpane.Url"/>
</Action>
```

### Reading the current email

```typescript
Office.context.mailbox.item.body.getAsync(
  Office.CoercionType.Text,
  (result) => {
    if (result.status === Office.AsyncResultStatus.Succeeded) {
      const emailBody = result.value;
      // Send to AI for reply generation
    }
  }
);
```

## Lessons from production

### Test on all platforms early

I made the mistake of building primarily on Outlook Web, then discovering that the Desktop client handles CSS differently, has stricter CSP rules, and loads the task pane in a different order. Test on all three platforms from day one.

### Cache aggressively

Office.js API calls are slow. Cache the email body, sender info, and conversation history on first read. Users expect instant responses when they click "Generate Reply."

### Respect the sandbox

You can't access `localStorage` reliably across all platforms. Use the Office.js `RoamingSettings` API for persistent state, and in-memory state for everything else.

## Was it worth it?

Absolutely. The activation energy for users is near zero: the tool is right there when they need it. The technical pain of Office.js is real, but the product advantage of being embedded in the workflow is unbeatable.
