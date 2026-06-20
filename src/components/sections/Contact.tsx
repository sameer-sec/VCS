"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRenderedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();
    const website = String(data.get("website") || ""); // honeypot

    if (name.length < 2) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (message.length < 10) {
      setStatus("error");
      setErrorMessage("Please include a few more details in your message.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          message,
          website,
          formRenderedAt: formRenderedAt.current,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      formRef.current?.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  return (
    <section id="contact" className="section-pad relative">
      <div className="container-px mx-auto max-w-content">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title="Tell Us About Your Brand"
              align="left"
              description="Prefer to skip the call? Send the details and we'll reply within one business day."
            />

            <Reveal delay={0.2} className="mt-10 flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src="/logo-transparent.png"
                  alt="Visual Content Solution"
                  fill
                  className="object-contain drop-shadow-[0_0_20px_rgba(217,255,0,0.25)]"
                />
              </div>
              <div>
                <p className="font-display font-semibold text-white">
                  Visual Content Solution
                </p>
                <p className="text-sm text-ink-muted">{siteConfig.email}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card flex flex-col items-center justify-center gap-4 p-12 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <FiCheck size={28} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      Message Sent
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">
                      Thanks for reaching out — we&apos;ll reply within one business day.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-sm font-medium text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="glass-card flex flex-col gap-5 p-8"
                  noValidate
                >
                  {/* Honeypot field — visually hidden off-screen, never display:none (which bots detect) */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      width: "1px",
                      height: "1px",
                      overflow: "hidden",
                    }}
                  >
                    <label htmlFor="website">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="name" label="Name" type="text" placeholder="Jane Smith" />
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="jane@company.com"
                    />
                  </div>
                  <Field
                    id="company"
                    label="Company"
                    type="text"
                    placeholder="Your company"
                    required={false}
                  />
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-white">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      rows={5}
                      placeholder="Tell us about your brand and goals..."
                      className="resize-none rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-ink-faint outline-none transition-colors focus:border-accent/50"
                    />
                  </div>

                  <AnimatePresence>
                    {status === "error" && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 overflow-hidden rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                      >
                        <FiAlertCircle className="shrink-0" size={16} />
                        {errorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary mt-2 disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message <FiSend size={15} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type,
  placeholder,
  required = true,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-white">
        {label}
        {!required && <span className="ml-1 text-ink-faint">(optional)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-ink-faint outline-none transition-colors focus:border-accent/50"
      />
    </div>
  );
}
