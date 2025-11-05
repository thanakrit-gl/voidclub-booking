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

  // 💜 HIGH TABLES (IDs 1–32)
  const baseStatusClass =
    zone === "regular"
      ? status === "available"
        ? "border border-purple-400 text-purple-200 bg-purple-700/20 shadow-[0_0_14px_rgba(200,100,255,0.7)] hover:shadow-[0_0_20px_rgba(220,140,255,1)] hover:border-purple-200 hover:text-white cursor-pointer"
        : status === "booked"
        ? "bg-purple-900/40 text-purple-700 border border-purple-900 cursor-not-allowed"
        : "bg-purple-400 text-black border border-white shadow-[0_0_25px_rgba(200,100,255,1)] cursor-not-allowed"
      : "";

  // 🌊 VIP (V1–V14) — bright cyan glow
  const vipAquaClass =
    zone === "vip"
      ? status === "available"
        ? "border border-[#41f3ff] text-[#bffbff] bg-[#41f3ff]/10 shadow-[0_0_20px_rgba(65,243,255,0.85)] hover:shadow-[0_0_30px_rgba(120,255,255,1)] hover:border-white hover:text-white cursor-pointer"
        : status === "booked"
        ? "bg-[#072a33]/60 text-[#4ac7d4] border border-[#0c3d47] cursor-not-allowed"
        : // PAID
          "bg-[#41f3ff] text-black border border-white shadow-[0_0_35px_rgba(65,243,255,1)] cursor-not-allowed"
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



// 💚 VVIP ATTIC (VA1–VA4) — Neon mint with *soft* translucent fill
const vipAtticClass =
  zone === "vvip-attic"
    ? status === "available"
      ? "border-[3px] border-[#40FF7A] text-[#B8FFC8] bg-[#40FF7A]/15 shadow-[0_0_26px_rgba(64,255,122,0.65)] hover:shadow-[0_0_42px_rgba(64,255,122,1)] hover:border-white hover:text-white cursor-pointer"
      : status === "booked"
      ? "bg-[#102419]/60 text-[#3fa76a] border border-[#1e4d32] cursor-not-allowed"
      : // PAID — solid mint flex mode
        "bg-[#40FF7A] text-black border-[3px] border-white shadow-[0_0_42px_rgba(64,255,122,1)] cursor-not-allowed"
    : "";

  // 💎 VIP BALCONY (VB*) — bright ice-blue glow
  const vipBalconyClass =
    zone === "vip-balcony"
      ? status === "available"
        ? "border border-[#9ce7ff] text-[#d5f6ff] bg-[#5ad6ff]/15 shadow-[0_0_18px_rgba(150,235,255,0.8)] hover:shadow-[0_0_26px_rgba(180,250,255,1)] hover:border-white hover:text-white cursor-pointer"
        : status === "booked"
        ? "bg-[#0c1a22]/60 text-[#6bb8cc] border border-[#1c3f47] cursor-not-allowed"
        : // PAID
          "bg-[#9ce7ff] text-black border border-white shadow-[0_0_30px_rgba(150,235,255,1)] cursor-not-allowed"
      : "";

  return (
    <button
      style={{ left: `${x}%`, top: `${y}%` }}
      className={`absolute -translate-x-1/2 -translate-y-1/2 
        rounded-md font-semibold select-none transition-all duration-200
        ${sizeClass}
        ${vipGoldClass || vipAtticClass || vipBalconyClass || vipAquaClass || baseStatusClass}      `}
      onClick={() => status === "available" && onClick(id)}
    >
      {id}
    </button>
  );
}