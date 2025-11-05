"use client";

export default function ZoneHighlight({
  x,
  y,
  width,
  height,
  color,
}: {
  x: number;  // center position in %
  y: number;  // center position in %
  width: number; // width in %
  height: number; // height in %
  color: string; // tailwind gradient or rgba
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-xl blur-xl opacity-60"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
        background: color,
      }}
    />
  );
}