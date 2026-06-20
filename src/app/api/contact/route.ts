import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/lib/content";

// Validates and sends contact form submissions to visualcontentsolution@gmail.com via Resend.
// Spam protection: honeypot field + minimum time-on-form check, both rejected silently
// with a generic success-shaped response so bots get no signal their submission was blocked.

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(120, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),
  company: z.string().trim().max(160, "Company name is too long").optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
  // Honeypot — real users never see or fill this field (hidden via CSS)
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  // Timestamp the form was rendered, set client-side — used to reject instant/bot submissions
  formRenderedAt: z.number().optional(),
});

const MIN_SUBMIT_SECONDS = 3;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? "Invalid submission." },
      { status: 400 }
    );
  }

  const { name, email, company, message, website, formRenderedAt } = parsed.data;

  // Honeypot triggered — silently pretend success so bots don't learn to avoid the field
  if (website && website.length > 0) {
    return NextResponse.json({ success: true });
  }

  // Submitted too fast to be a real human filling out a form — likely a bot
  if (formRenderedAt && Date.now() - formRenderedAt < MIN_SUBMIT_SECONDS * 1000) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const recipient = process.env.CONTACT_FORM_RECIPIENT || "visualcontentsolution@gmail.com";
  const fromAddress =
    process.env.CONTACT_FORM_FROM || `${siteConfig.name} <onboarding@resend.dev>`;

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: recipient,
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="color:#111;">New website enquiry</h2>
          <table style="width:100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding:8px 0; color:#666; width:120px;">Name</td><td style="padding:8px 0; color:#111;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0; color:#666;">Email</td><td style="padding:8px 0; color:#111;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:8px 0; color:#666;">Company</td><td style="padding:8px 0; color:#111;">${escapeHtml(company || "—")}</td></tr>
          </table>
          <p style="color:#666; margin-bottom:4px;">Message</p>
          <p style="color:#111; white-space: pre-wrap; line-height:1.6;">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send your message. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
