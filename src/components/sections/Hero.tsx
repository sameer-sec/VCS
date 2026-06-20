"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaAmazon } from "react-icons/fa";
import { SiEbay } from "react-icons/si";
import { Shield, Rocket, Target, Star, ChevronDown, Play } from "lucide-react";
import { VSLPlayer } from "@/components/ui/VSLPlayer";

const trustBadges = [
  { icon: Shield, label: "Proven Strategies" },
  { icon: Rocket, label: "Fast Turnaround" },
  { icon: Target, label: "Results Driven" },
  { icon: Star, label: "5-Star Rated" },
];

const floatIcons = [
  { Icon: FaInstagram, top: "2%", left: "0%", delay: 0, color: "#E1306C" },
  { Icon: FaYoutube, top: "26%", left: "-8%", delay: 0.3, color: "#FF0000" },
  { Icon: SiEbay, top: "50%", left: "-12%", delay: 0.6, color: "#E53238" },
  { Icon: FaAmazon, top: "74%", left: "-6%", delay: 0.9, color: "#FF9900" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />

      <div className="container-px relative mx-auto max-w-content">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Left: copy */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-display text-[2.4rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
            >
              We Build Powerful
              <br />
              <span className="text-accent">Visual Brands</span>
              <br />
              That Attract &amp;
              <br />
              Convert High-Ticket Clients.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              Strategic branding, content creation &amp; growth systems
              designed to scale your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <a href="#booking" className="btn-primary">
                Book Free Strategy Call
                <span aria-hidden="true">→</span>
              </a>
              <a href="#results" className="btn-secondary">
                View Our Work
                <Play size={13} fill="currentColor" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-ink-muted">
                  <Icon size={16} className="text-accent" />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: laptop mockup with VSL + floating platform icons */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {floatIcons.map(({ Icon, top, left, delay, color }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + delay }}
                className="absolute z-20 hidden h-14 w-14 items-center justify-center rounded-2xl border border-line bg-bg-card/90 shadow-glow-sm backdrop-blur-md sm:flex"
                style={{ top, left, color }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4 + delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Icon size={22} />
                </motion.div>
                {/* Dashed connector toward the laptop */}
                <span className="absolute left-full top-1/2 hidden h-px w-10 -translate-y-1/2 border-t border-dashed border-accent/40 lg:block" />
              </motion.div>
            ))}

            {/* Handwritten-style annotation */}
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute -bottom-2 left-2 z-20 hidden -rotate-3 font-display text-sm italic text-accent sm:block"
            >
              Brand. Content. Growth.
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative z-10"
              style={{ perspective: "1200px" }}
            >
              {/* Laptop frame */}
              <div className="relative rounded-t-2xl border border-line bg-gradient-to-b from-[#161616] to-[#0a0a0a] p-3 shadow-glow">
                <div className="flex items-center gap-1.5 px-2 pb-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-bg-card">
                  <VSLPlayer className="absolute inset-0 h-full w-full" fillFrame />
                </div>
              </div>
              {/* Laptop base */}
              <div className="mx-auto h-4 w-[104%] -translate-x-[2%] rounded-b-xl bg-gradient-to-b from-[#1c1c1c] to-[#0a0a0a]" />
              <div className="mx-auto h-1.5 w-[40%] rounded-b-lg bg-[#0a0a0a]" />
            </motion.div>

            {/* Glow underneath */}
            <div className="pointer-events-none absolute -inset-x-10 bottom-0 h-40 bg-accent/10 blur-[80px]" />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 1 }, y: { duration: 2, repeat: Infinity } }}
          className="mt-12 flex justify-center"
        >
          <ChevronDown size={20} className="text-ink-faint" />
        </motion.div>
      </div>
    </section>
  );
}
