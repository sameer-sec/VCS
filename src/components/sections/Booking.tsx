"use client";

import Script from "next/script";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/content";

// Real, inline Calendly booking calendar — not a popup, not an image, not a
// redirect. Uses the official calendly-inline-widget pattern exactly as
// Calendly's own embed code specifies (data-url + widget.js), wrapped in the
// site's glowing card styling. Desktop height is fixed at 700px per spec;
// mobile gets a shorter height via a CSS override scoped to this section only,
// since Calendly's widget reads inline style as its base height but still
// needs a smaller viewport on narrow phones to avoid excess empty scroll.
export function Booking() {
  return (
    <section id="booking" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-radial-glow" />
      <div className="container-px relative mx-auto max-w-content">
        <SectionHeading
          eyebrow="Get Started"
          title="Book Your Free Strategy Call"
          description="30 minutes. We'll review your brand, identify the highest-leverage opportunities, and map out next steps — no pressure, no obligation."
        />

        <Reveal delay={0.2} className="mt-14">
          <div className="glow-border relative overflow-hidden rounded-2xl border border-line bg-bg-card shadow-glow p-2 sm:p-3">
            <div id="calendly-embed-wrapper" className="overflow-hidden rounded-xl">
              <div
                className="calendly-inline-widget"
                data-url={siteConfig.calendlyUrl}
                style={{ minWidth: "320px", height: "700px" }}
              />
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scoped responsive height override — desktop stays exactly 700px per spec */}
      <style>{`
        @media (max-width: 640px) {
          #calendly-embed-wrapper .calendly-inline-widget {
            height: 560px !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          #calendly-embed-wrapper .calendly-inline-widget {
            height: 650px !important;
          }
        }
      `}</style>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
