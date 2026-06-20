"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { pricingPlans } from "@/lib/content";

export function Pricing() {
  return (
    <section id="pricing" className="section-pad relative overflow-hidden">
      <div className="container-px mx-auto max-w-content">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:items-start lg:gap-8">
          <div>
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                Choose The Plan
                <br />
                That Fits <span className="text-accent underline decoration-2 underline-offset-4">You Best</span>
              </h2>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {pricingPlans.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    data-cursor="card"
                    className={cn(
                      "relative flex h-full flex-col rounded-2xl border p-6 transition-colors duration-300",
                      plan.popular
                        ? "border-accent/50 bg-gradient-to-b from-accent/[0.08] to-bg-card shadow-glow"
                        : "border-line bg-bg-card hover:border-white/20"
                    )}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-bold uppercase tracking-wide text-bg">
                        Most Popular
                      </span>
                    )}

                    <h3 className="font-display text-base font-bold text-white">
                      {plan.name}
                    </h3>

                    <div className="mt-3 flex items-baseline gap-1.5">
                      <span className="font-display text-3xl font-bold text-white">
                        {plan.price}
                      </span>
                    </div>
                    <span className="text-xs text-ink-faint">{plan.period}</span>

                    <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-ink-muted"
                        >
                          <Check className="mt-0.5 shrink-0 text-accent" size={14} />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#booking"
                      className={cn(
                        "mt-6 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                        plan.popular
                          ? "bg-accent text-bg hover:shadow-glow-sm hover:-translate-y-0.5"
                          : "border border-line text-white hover:border-accent/40 hover:bg-white/[0.04]"
                      )}
                    >
                      Get Started
                    </a>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Decorative panel — desktop only, evokes the reference's keyboard/doodle accent */}
          <div className="relative hidden h-full min-h-[280px] lg:block">
            <motion.svg
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewBox="0 0 200 200"
              className="absolute right-0 top-0 h-40 w-40 text-accent/70"
              fill="none"
            >
              <path
                d="M40 30 C 90 30, 90 90, 140 90 C 160 90, 170 80, 175 70"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M160 60 L 175 70 L 165 85"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </motion.svg>

            <div className="absolute bottom-6 right-2 h-24 w-44 -rotate-6 rounded-xl border border-line bg-gradient-to-br from-bg-elevated to-bg-card shadow-glow-sm">
              <div className="grid h-full grid-cols-8 gap-1 p-3">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="rounded-[2px] bg-white/[0.04]" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
