"use client";

import { motion } from "framer-motion";
import { Search, Target, Sparkles, Rocket } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/content";

const stepIcons = { search: Search, target: Target, sparkles: Sparkles, rocket: Rocket };

export function Process() {
  return (
    <section id="process" className="section-pad relative overflow-hidden">
      <div className="container-px mx-auto max-w-content">
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-ink-faint">
            Our
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Simple Process
          </h2>
        </Reveal>

        <div className="glass-card relative mt-10 max-w-full overflow-x-auto px-6 py-10 sm:px-10">
          <div className="relative flex min-w-[640px] items-start justify-between sm:min-w-0">
            {/* Connecting dashed line */}
            <div className="absolute left-[10%] right-[10%] top-7 hidden h-px sm:block">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
                className="h-full border-t border-dashed border-accent/40"
              />
            </div>

            {processSteps.map((step, i) => {
              const Icon = stepIcons[step.icon as keyof typeof stepIcons];
              return (
                <Reveal
                  key={step.number}
                  delay={i * 0.12}
                  className="relative z-10 flex flex-1 flex-col items-center text-center px-2"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-bg text-accent shadow-glow-sm">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 font-display text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-[140px] text-xs leading-relaxed text-ink-muted">
                    {step.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
