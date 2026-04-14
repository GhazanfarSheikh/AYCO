"use client";

export function ProductVideo({ poster, src }: { poster: string; src: string }) {
  return (
    <video
      autoPlay
      className="aspect-square w-full rounded-[var(--radius-xl)] object-cover"
      loop
      muted
      playsInline
      poster={poster}
      src={src}
    />
  );
}
