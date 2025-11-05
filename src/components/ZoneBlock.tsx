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
            pointer-events-none select-none
            uppercase font-semibold tracking-[0.18em]
            text-[10px] md:text-[13px]
            text-white/85 
            bg-white/5 border border-white/25 
            backdrop-blur-sm rounded-md
            shadow-[0_0_10px_rgba(255,255,255,0.25)]
        "
        style={{
            left: `${x}%`,
            top: `${y}%`,
            width: `${w}%`,
            height: `${h}%`,
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--font-orbitron)",
        }}
        >
        {label}
        </div>
  );
}