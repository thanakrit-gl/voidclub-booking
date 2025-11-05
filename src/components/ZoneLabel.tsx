"use client";

type Props = {
  x: number;
  y: number;
  label: string;
};

export default function ZoneLabel({ x, y, label }: Props) {
  const upper = label.toUpperCase();

  let colorClass = "text-white/70 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]";
  let fontSize = "11px";
  let spacing = "0.06em";

  if (upper === "ATTIC") {
    // 🟢 Neon VVIP Attic
    colorClass = "text-[#40FF7A] drop-shadow-[0_0_12px_rgba(64,255,122,1)]";
    fontSize = "14px";
    spacing = "0.12em";
  } else if (upper.includes("VIP")) {
    // 🔹 Cyan VIP zones
    colorClass = "text-[#66E8FF] drop-shadow-[0_0_10px_rgba(102,232,255,0.8)]";
    fontSize = "12px";
    spacing = "0.10em";
  }

  return (
    <div
      className={`
        absolute select-none pointer-events-none uppercase font-[var(--font-orbitron)] font-semibold
        ${colorClass}
      `}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        fontSize,
        letterSpacing: spacing,
      }}
    >
      {label}
    </div>
  );
}