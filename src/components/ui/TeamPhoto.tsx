"use client";

import { useState } from "react";
import Image from "next/image";
import { FaUserTie } from "react-icons/fa";

export function TeamPhoto({ src, alt }: { src: string; alt: string }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/15 via-bg-card to-bg">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-accent/20 bg-white/[0.03] text-accent/70">
          <FaUserTie size={36} />
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      onError={() => setErrored(true)}
    />
  );
}
