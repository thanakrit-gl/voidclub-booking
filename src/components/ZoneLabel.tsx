"use client";

type Props = {
  x: number;
  y: number;
  label: string;
};

export default function ZoneLabel({ x, y, label }: Props) {
  const isAttic = label.toUpperCase() === "ATTIC";

  return (
    <div
      className={`
        absolute select-none pointer-events-none uppercase font-semibold tracking-wide 
        ${isAttic 
          ? "text-pink-300 drop-shadow-[0_0_10px_rgba(255,90,200,1)]" 
          : "text-white/70 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
        }
      `}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        fontSize: isAttic ? "14px" : "11px",
        letterSpacing: isAttic ? "0.12em" : "0.06em",
      }}
    >
      {label}
    </div>
  );
}