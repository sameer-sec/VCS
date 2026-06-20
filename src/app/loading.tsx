import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg">
      <div className="relative h-16 w-16 animate-pulse">
        <Image
          src="/logo-transparent.png"
          alt="Loading"
          fill
          className="object-contain drop-shadow-[0_0_24px_rgba(217,255,0,0.35)]"
        />
      </div>
    </div>
  );
}
