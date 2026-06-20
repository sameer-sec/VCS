"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { Reveal } from "@/components/ui/Reveal";
import { TeamPhoto } from "@/components/ui/TeamPhoto";
import { testimonials, teamMembers } from "@/lib/content";

const socialIcons = [FaInstagram, FaFacebook, FaYoutube];

export function ClientsAndTeam() {
  return (
    <section id="team" className="section-pad relative">
      <div className="container-px mx-auto max-w-content">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          {/* Left: testimonials */}
          <div className="min-w-0">
            <Reveal>
              <div className="flex items-center gap-3">
                <Quote className="text-accent" size={20} />
                <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  What Our Clients Say
                </h2>
              </div>
            </Reveal>

            <div className="min-w-0 mt-8 -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:mx-0 sm:grid sm:grid-cols-1 sm:px-0 sm:pb-0 md:grid-cols-3 lg:grid-cols-1">
              {testimonials.map((t, i) => (
                <Reveal
                  key={t.name}
                  delay={i * 0.1}
                  className="min-w-[78%] snap-center sm:min-w-0"
                >
                  <div
                    data-cursor="card"
                    className="glass-card flex h-full flex-col p-5 transition-colors duration-300 hover:border-accent/30"
                  >
                    <div className="flex gap-0.5 text-accent">
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} size={13} fill="currentColor" />
                      ))}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-4 flex items-center gap-2.5 border-t border-line pt-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-accent/5 font-display text-xs font-bold text-accent">
                        {t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-ink-faint">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: team */}
          <div>
            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Meet The <span className="text-accent">Visionaries</span>
              </h2>
            </Reveal>

            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {teamMembers.map((member, i) => (
                <Reveal key={member.name} delay={0.15 + i * 0.08}>
                  <div
                    data-cursor="card"
                    className="glow-border group relative h-full overflow-hidden rounded-2xl border border-line bg-bg-card/80 backdrop-blur-sm transition-colors duration-300 hover:border-accent/30"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <TeamPhoto src={member.image} alt={member.name} />

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bg via-bg/80 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <p className="font-display text-sm font-bold text-white">
                          {member.name}
                        </p>
                        <p className="text-[11px] text-accent">{member.role}</p>

                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          whileHover={{ opacity: 1, height: "auto" }}
                          className="mt-2 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        >
                          {socialIcons.map((Icon, idx) => (
                            <a
                              key={idx}
                              href="#"
                              aria-label="Social link"
                              className="flex h-6 w-6 items-center justify-center rounded-full border border-line bg-bg/60 text-white backdrop-blur-sm transition-colors hover:border-accent/50 hover:text-accent"
                            >
                              <Icon size={10} />
                            </a>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
