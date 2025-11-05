"use client";

type Props = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
};

export default function ZoneBlock({ x, y, w, h, label }: Props) {
  return (
        <div
        className="
            absolute flex items-center justify-center 
            text-[11px] tracking-wide uppercase font-semibold
            bg-white/10 border border-white/30 
            text-white 
            backdrop-blur-sm rounded-md 
            shadow-[0_0_12px_rgba(255,255,255,0.25)]
            pointer-events-none select-none
        "
        style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${w}%`,
            height: `${h}%`,
            transform: "translate(-50%, -50%)",
        }}
        >
        {label}
        </div>
  );
}