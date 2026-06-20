"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import {
  BrandIcon,
  ContentIcon,
  EcommerceIcon,
  MarketingIcon,
  SocialIcon,
  ConsultationIcon,
} from "@/components/ui/ServiceIcons";
import { services } from "@/lib/content";

const icons = {
  brand: BrandIcon,
  content: ContentIcon,
  ecommerce: EcommerceIcon,
  marketing: MarketingIcon,
  social: SocialIcon,
  consultation: ConsultationIcon,
};

export function Services() {
  return (
    <section id="services" className="section-pad relative">
      <div className="container-px mx-auto max-w-content">
        <SectionHeading
          eyebrow="Services We Provide"
          title="Everything You Need Under One Roof."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <Reveal key={service.title} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  data-cursor="card"
                  className="glow-border group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg-card p-6 transition-colors duration-300 hover:border-accent/30"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/0 blur-3xl transition-all duration-500 group-hover:bg-accent/10" />

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-xl border border-line bg-white/[0.03] transition-all duration-300 group-hover:border-accent/40 group-hover:shadow-glow-sm">
                    <Icon />
                  </div>

                  <h3 className="relative mt-5 font-display text-lg font-bold text-white">
                    {service.title}
                  </h3>

                  <ul className="relative mt-4 flex flex-1 flex-col gap-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-ink-muted before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-accent"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-300 hover:gap-2.5"
                  >
                    Learn more <ArrowRight size={14} />
                  </a>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
