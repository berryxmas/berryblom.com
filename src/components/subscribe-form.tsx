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
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-[370px] flex-col gap-2 sm:flex-row"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 rounded-[7px] border px-[14px] py-[10px] text-[13px] outline-none transition-all duration-200 placeholder:text-(--ink-faint)"
          style={{
            backgroundColor: "var(--paper-dark)",
            borderColor: "var(--border)",
            color: "var(--ink)",
            fontFamily: '"DM Sans", sans-serif',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--terracotta-light)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border)";
          }}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="cursor-pointer rounded-[7px] px-[18px] py-[10px] text-[13px] transition-colors duration-200"
          style={{
            backgroundColor: "var(--ink)",
            color: "var(--paper)",
            fontFamily: '"DM Sans", sans-serif',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "var(--terracotta)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "var(--ink)";
          }}
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
        {status === "error" && (
          <p className="self-center text-sm" style={{ color: "var(--terracotta)" }}>
            Something went wrong. Try again.
          </p>
        )}
      </form>
      <p className="mt-[9px] text-[11px]" style={{ color: "var(--ink-faint)" }}>
        Occasional posts on AI, building, and what I&apos;m learning. No spam.
      </p>
    </div>
  );
}
