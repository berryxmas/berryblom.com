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
      <p
        className="text-sm mt-1"
        style={{ color: "var(--terracotta)" }}
      >
        You&apos;re in. Thanks for subscribing.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200 border"
          style={{
            backgroundColor: "var(--paper-dark)",
            borderColor: "var(--border)",
            color: "var(--ink)",
            fontFamily: '"DM Sans", sans-serif',
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--terracotta-light)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
          style={{
            backgroundColor: "var(--ink)",
            color: "var(--paper)",
            fontFamily: '"DM Sans", sans-serif',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
        {status === "error" && (
          <p className="text-sm self-center" style={{ color: "var(--terracotta)" }}>
            Something went wrong. Try again.
          </p>
        )}
      </form>
      <p className="text-xs mt-2" style={{ color: "var(--ink-faint)" }}>
        Occasional posts on AI, building, and what I'm learning. No spam.
      </p>
    </div>
  );
}
