export const dynamic = "force-dynamic";

import SeatMap from "@/components/SeatMap";

export default function Page() {
  return (
    <main className="p-4 text-white">

      {/* TITLE */}
      <h1 className="text-center text-2xl font-bold mb-4 tracking-wide">
        VOID — Reservations
      </h1>

      {/* LEGEND AT TOP */}
      <div className="flex justify-center gap-6 mb-6 text-sm text-gray-300 select-none">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-emerald-400 rounded-sm shadow-[0_0_8px_rgba(0,255,200,0.6)]"></div>
          Available
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded-sm shadow-[0_0_8px_rgba(255,140,0,0.6)]"></div>
          Booked
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-300 rounded-sm shadow-[0_0_8px_rgba(255,220,0,0.7)]"></div>
          Paid
        </div>
      </div>

      {/* SEAT MAP */}
      <SeatMap />
    </main>
  );
}