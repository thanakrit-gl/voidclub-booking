"use client";

type Props = {
  id: string;
  status: "available" | "booked" | "paid";
  x: number;
  y: number;
  onClick: (id: string) => void;
};

export default function Seat({ id, status, x, y, onClick }: Props) {
  // Determine zone
  const zone =
    id.startsWith("VA") ? "vvip-attic" :
    id.startsWith("VC") ? "vvip-center" :
    id.startsWith("VB") ? "vip-balcony" :
    id.startsWith("V")  ? "vip" :
    "regular";

  // ✅ Size adjustments
  const sizeClass =
    zone === "vvip-center"      // VC → largest
      ? "px-5 py-1.6 text-base"
      : zone === "vvip-attic"   // VA
      ? "px-2 py-4 text-sm"
      : zone === "vip" || zone === "vip-balcony" // V / VB
      ? "px-3.5 py-2 text-sm"
      : "px-3 py-1.5 text-xs"; // 1–32

  // ✅ Default emerald theme (non-V1–V14)
  const baseStatusClass =
    status === "available"
      ? "border border-emerald-400 text-emerald-300 bg-transparent shadow-[0_0_12px_rgba(0,255,200,0.45)] hover:shadow-[0_0_20px_rgba(0,255,200,1)] hover:border-emerald-200 hover:text-white cursor-pointer"
      : status === "booked"
      ? "bg-emerald-900/30 text-emerald-800 border border-emerald-900 cursor-not-allowed"
      : "bg-emerald-500/85 text-black border border-emerald-200 shadow-[0_0_18px_rgba(0,255,200,0.8)] cursor-not-allowed";

  // 🌊 Aqua VIP (V1–V14)
  const vipAquaClass =
    zone === "vip"
      ? status === "available"
        ? "border border-[#66e8ff] text-[#b8faff] bg-transparent shadow-[0_0_14px_rgba(102,232,255,0.55)] hover:shadow-[0_0_22px_rgba(102,232,255,1)] hover:border-white hover:text-white cursor-pointer"
        : status === "booked"
        ? "bg-[#0d1c21]/60 text-[#4ea9bd] border border-[#18424c] cursor-not-allowed"
        : "bg-[#66e8ff] text-black border border-white shadow-[0_0_22px_rgba(102,232,255,1)] cursor-not-allowed"
      : "";

  // ✨ **GOLD VVIP CENTER (VC1 & VC2)** — strongest styling
  const vipGoldClass =
    zone === "vvip-center"
      ? status === "available"
        ? "border-[3px] border-yellow-300 text-yellow-200 bg-transparent shadow-[0_0_25px_rgba(255,215,0,0.75)] hover:shadow-[0_0_40px_rgba(255,215,0,1)] hover:border-white hover:text-white cursor-pointer"
        : status === "booked"
        ? "bg-yellow-900/40 text-yellow-600 border border-yellow-800 cursor-not-allowed"
        : // PAID (gold flex)
          "bg-yellow-300 text-black border-[3px] border-white shadow-[0_0_40px_rgba(255,215,0,1)] cursor-not-allowed"
      : "";

  // 💜 VVIP ATTIC (VA1–VA4) — tall + pink/purple glow
  const vipAtticClass =
    zone === "vvip-attic"
      ? status === "available"
        ? "border-[3px] border-pink-400 text-pink-200 bg-pink-600/20 shadow-[0_0_28px_rgba(255,100,200,0.95)] hover:shadow-[0_0_42px_rgba(255,120,220,1)] hover:border-white hover:text-white cursor-pointer"
        : status === "booked"
        ? "bg-pink-900/30 text-pink-700 border border-pink-900 cursor-not-allowed"
        : // PAID (VIP flex mode)
          "bg-pink-400 text-black border-[3px] border-white shadow-[0_0_38px_rgba(255,100,200,1)] cursor-not-allowed"
      : "";

  return (
    <button
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 
        rounded-md font-semibold select-none transition-all duration-200
        ${sizeClass}
        ${vipGoldClass || vipAtticClass || vipAquaClass || baseStatusClass}
      `}
      onClick={() => status === "available" && onClick(id)}
    >
      {id}
    </button>
  );
}