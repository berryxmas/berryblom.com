import React from "react";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import WelcomeEmail from "@/emails/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "Berry Blom <hello@berryblom.com>";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const { error: contactError } = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    if (contactError) {
      console.error("Resend contacts error:", contactError);
      return NextResponse.json({ error: "Subscribe failed" }, { status: 500 });
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "You're on the list — Berry Blom",
      react: React.createElement(WelcomeEmail),
    });

    if (error) {
      console.error("Resend welcome email error:", error);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
