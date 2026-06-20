"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies } from "@/lib/content";

function GrowthChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (v / max) * 90;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-16 w-full">
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9FF00" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D9FF00" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polygon
        points={areaPoints}
        fill="url(#chartFill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke="#D9FF00"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

export function Results() {
  return (
    <section id="results" className="section-pad relative">
      <div className="container-px mx-auto max-w-content">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-8">
          {/* Left: heading + CTA */}
          <Reveal>
            <div>
              <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">
                Real Results.
                <br />
                Real Businesses.
                <br />
                <span className="text-accent">Real Growth.</span>
              </h2>
              <a
                href="#contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.05]"
              >
                View Case Studies <ArrowRight size={15} />
              </a>
            </div>
          </Reveal>

          {/* Right: showcase cards */}
          <div className="min-w-0 -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-3 sm:overflow-visible">
            {caseStudies.map((study, i) => (
              <Reveal
                key={study.label}
                delay={i * 0.1}
                className="min-w-[78%] snap-center sm:min-w-0"
              >
                <div
                  data-cursor="card"
                  className="glass-card flex h-full flex-col p-6 transition-colors duration-300 hover:border-accent/30"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-mono uppercase tracking-[0.15em] text-ink-faint">
                      {study.client}
                    </p>
                    <TrendingUp size={14} className="text-accent" />
                  </div>
                  <div className="mt-3 font-display text-3xl font-bold text-accent">
                    {study.metric}
                  </div>
                  <p className="mt-1 text-sm font-medium text-white">{study.label}</p>
                  <div className="mt-4">
                    <GrowthChart data={study.chartData} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
