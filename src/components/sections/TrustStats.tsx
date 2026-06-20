import { TrendingUp, Users, PlayCircle, Banknote } from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { trustStats } from "@/lib/content";

const statIcons = [TrendingUp, Users, PlayCircle, Banknote];

export function TrustStats() {
  return (
    <section className="relative -mt-2">
      <div className="container-px mx-auto max-w-content">
        <Reveal>
          <div className="glass-card flex flex-col gap-8 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            {trustStats.map((stat, i) => {
              const Icon = statIcons[i];
              return (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent shadow-glow-sm">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                      <Counter to={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-xs text-ink-muted sm:text-sm">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
