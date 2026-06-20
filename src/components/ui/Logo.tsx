import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showName = true,
  showTagline = false,
  size = 40,
}: {
  className?: string;
  showName?: boolean;
  showTagline?: boolean;
  size?: number;
}) {
  return (
    <Link
      href="#top"
      className={cn("flex items-center gap-3 group", className)}
      aria-label="Visual Content Solution home"
    >
      <div
        className="relative shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo-transparent.png"
          alt="Visual Content Solution logo"
          fill
          sizes={`${size}px`}
          className="object-contain drop-shadow-[0_0_18px_rgba(217,255,0,0.25)]"
          priority
        />
      </div>
      {showName && (
        <span className="flex flex-col leading-tight">
          <span className="font-display text-[15px] font-bold tracking-tight text-white whitespace-nowrap">
            Visual Content Solution
          </span>
          {showTagline && (
            <span className="text-[10px] text-ink-faint whitespace-nowrap">
              We Build Brands That Generate Revenue
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
