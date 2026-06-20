"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { siteConfig } from "@/lib/content";

// Primary conversion asset. Loads the Vimeo iframe once the player scrolls into view,
// autoplaying muted (required for autoplay to work in all browsers), with a large
// premium unmute control. Falls back to click-to-play if the person prefers not to
// autoplay or if the player hasn't entered view yet — iframe is not mounted until
// then, so there's zero network/perf cost above the fold before it's actually seen.
export function VSLPlayer({
  className = "",
  fillFrame = false,
}: {
  className?: string;
  fillFrame?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [manuallyStarted, setManuallyStarted] = useState(false);

  useEffect(() => {
    if (isInView) setLoaded(true);
  }, [isInView]);

  const shouldShowPlayer = loaded || manuallyStarted;

  // Compact mode: fills its parent frame exactly (used inside the hero laptop
  // mockup screen) — no outer ambient glow card, no max-width, no aspect-ratio
  // wrapper, since the laptop bezel already provides that framing.
  if (fillFrame) {
    return (
      <div className={className} ref={containerRef}>
        <div className="group relative h-full w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {!shouldShowPlayer ? (
              <motion.button
                key="poster"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setManuallyStarted(true)}
                aria-label="Play video"
                data-cursor="video"
                className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-elevated via-bg-card to-bg"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,255,0,0.12),transparent_65%)]" />
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-accent shadow-glow-sm transition-shadow duration-300 group-hover:shadow-glow sm:h-16 sm:w-16"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
                  <Play size={18} className="relative ml-0.5 text-bg sm:size-6" fill="currentColor" />
                </motion.div>
              </motion.button>
            ) : (
              <motion.div
                key="player"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 h-full w-full"
              >
                <iframe
                  src={`https://player.vimeo.com/video/${siteConfig.vimeoId}?autoplay=1&muted=${muted ? 1 : 0}&loop=1&title=0&byline=0&portrait=0&color=D9FF00&background=0`}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                  allowFullScreen
                  title="Visual Content Solution — How It Works"
                />
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? "Unmute video" : "Mute video"}
                  whileHover={{ scale: 1.08 }}
                  className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-bg/85 text-white backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent sm:bottom-3 sm:right-3 sm:h-9 sm:w-9"
                >
                  {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className={className} ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="group relative mx-auto w-full max-w-4xl"
      >
        {/* Ambient glow behind the player */}
        <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/10 blur-[60px] sm:-inset-10" />

        <div className="glow-border relative overflow-hidden rounded-2xl border border-line bg-bg-card shadow-glow sm:rounded-3xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl">
            <AnimatePresence mode="wait">
              {!shouldShowPlayer ? (
                <motion.button
                  key="poster"
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setManuallyStarted(true)}
                  aria-label="Play video"
                  data-cursor="video"
                  className="absolute inset-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-bg-elevated via-bg-card to-bg"
                >
                  <div className="pointer-events-none absolute inset-0 flex items-end justify-center gap-1.5 px-10 pb-10 opacity-20 sm:gap-2">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-full max-w-[6px] rounded-full bg-accent"
                        animate={{
                          height: [
                            `${20 + ((i * 13) % 50)}%`,
                            `${30 + ((i * 7) % 60)}%`,
                            `${20 + ((i * 13) % 50)}%`,
                          ],
                        }}
                        transition={{
                          duration: 2.2 + (i % 5) * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-accent shadow-glow-sm transition-shadow duration-300 group-hover:shadow-glow sm:h-28 sm:w-28"
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent/40" />
                    <Play
                      size={36}
                      className="relative ml-1 text-bg sm:size-10"
                      fill="currentColor"
                    />
                  </motion.div>

                  <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-line bg-bg/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-ink-muted backdrop-blur-sm sm:bottom-8">
                    Watch How It Works
                  </span>
                </motion.button>
              ) : (
                <motion.div
                  key="player"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 h-full w-full"
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${siteConfig.vimeoId}?autoplay=1&muted=${muted ? 1 : 0}&loop=1&title=0&byline=0&portrait=0&color=D9FF00&background=0`}
                    className="absolute inset-0 h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    allowFullScreen
                    title="Visual Content Solution — How It Works"
                  />

                  {/* Large premium mute/unmute control */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => setMuted((m) => !m)}
                    aria-label={muted ? "Unmute video" : "Mute video"}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-bg/85 text-white shadow-glow-sm backdrop-blur-md transition-colors hover:border-accent/50 hover:text-accent sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
                  >
                    {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </motion.button>

                  {muted && (
                    <motion.span
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="absolute bottom-5 left-4 rounded-full border border-line bg-bg/80 px-3 py-1.5 text-xs font-medium text-ink-muted backdrop-blur-sm sm:bottom-7 sm:left-6"
                    >
                      Tap speaker for sound
                    </motion.span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
