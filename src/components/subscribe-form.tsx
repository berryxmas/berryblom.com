"use client";

import { useState } from "react";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="text-[15px] text-[var(--terracotta)]">
        You&apos;re in. Thanks for subscribing.
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex max-w-[420px] flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--paper-raised)] px-3.5 py-2.5 text-[15px] text-[var(--ink)] outline-none transition-[border-color] duration-200 placeholder:text-[var(--ink-faint)] focus:border-[var(--terracotta)]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="cursor-pointer rounded-lg bg-[var(--ink)] px-5 py-2.5 text-[15px] text-[var(--paper)] transition-colors duration-200 hover:bg-[var(--terracotta)] disabled:cursor-wait"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-sm text-[var(--terracotta)]">
          Something went wrong. Try again.
        </p>
      )}
      <p className="mt-2.5 text-[13px] text-[var(--ink-muted)]">
        Occasional posts on building, AI, and life. No spam.
      </p>
    </div>
  );
}
