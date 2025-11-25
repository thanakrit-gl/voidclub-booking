"use client";

import { useEffect, useState } from "react";
import { seatPos } from "@/lib/seatPositions";
import Seat from "./Seat";
import BookingModal from "./BookingModal";
import { fetchSeats, bookSeat } from "@/lib/api";
import ZoneBlock from "./ZoneBlock";
import ZoneLabel from "./ZoneLabel";
import Legend from "./legend";

export default function SeatMap({ date }: { date: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [status, setStatus] = useState<Record<string, "available" | "booked">>({});
  const [noSchedule, setNoSchedule] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🌟 SAME STATUS BUILDER
  function buildStatus(marked: { id: string; status: "booked" }[]) {
    const newStatus: Record<string, "available" | "booked"> = {};
    Object.keys(seatPos).forEach((id) => (newStatus[id] = "available"));
    marked.forEach(({ id, status }) => (newStatus[id] = status));
    return newStatus;
  }

  // 🌟 LOAD WITH SPINNER → used ONLY for date change + confirm
  async function loadWithSpinner() {
    setLoading(true);
    try {
      const data = await fetchSeats(date);
      setNoSchedule(!data.marked || data.marked.length === 0);
      setStatus(buildStatus(data.marked ?? []));
    } catch (err) {
      console.error("❌ load error:", err);
    }
    setLoading(false);
  }

  // 🌟 SILENT LOAD (NO SPINNER) → used for auto-refresh
  async function silentLoad() {
    try {
      const data = await fetchSeats(date);
      setNoSchedule(!data.marked || data.marked.length === 0);
      setStatus(buildStatus(data.marked ?? []));
    } catch (err) {
      console.error("❌ silent load error:", err);
    }
  }

  // 🌟 ON DATE CHANGE → use spinner ONCE
  useEffect(() => {
    setNoSchedule(false);  // 🔥 reset instantly when date changes?????
    loadWithSpinner(); // show spinner only on date change

    // AUTO-REFRESH every 3 seconds WITHOUT spinner
    const interval = setInterval(() => {
      silentLoad();
    }, 3000);

    return () => clearInterval(interval);
  }, [date]);

  // ❌ IF NO SCHEDULE
  if (!loading && noSchedule) {
    return (
      <div className="w-full text-center text-red-400 py-10 text-xl font-semibold">
        ❌ No schedule exists for {date}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden px-2">
      <div
        className="relative mx-auto mt-4 bg-black rounded-xl"
        style={{ width: "700px", height: "900px" }}
      >
        <Legend />

        {/* SPINNER OVERLAY (only for date change & confirm) */}
        {loading && (
          <div className="absolute inset-0 z-[50] bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* BACKGROUND */}
        <img
          src="/seatmap.png"
          alt="Seat Map"
          className="w-full h-full object-cover pointer-events-none select-none"
        />

        {/* FOG */}
        <div className="fog-layer absolute inset-0 z-10 pointer-events-none" />

        {/* SEATS + LABELS */}
        <div className="absolute inset-0 z-20">
          <ZoneLabel label="ATTIC" x={82} y={26} />
          <ZoneLabel label="VIP LEFT" x={28} y={28} />
          <ZoneLabel label="VIP RIGHT" x={72} y={28} />

          <ZoneBlock label="STAGE" x={50} y={18} w={65} h={13} />
          <ZoneBlock label="DJ BOOTH" x={50} y={24} w={22} h={4} />
          <ZoneBlock label="DANCE FLOOR" x={50} y={31} w={32} h={6} />
          <ZoneBlock label="BAR" x={50} y={86} w={18} h={6} />

          {Object.entries(seatPos).map(([id, { x, y }]) => (
            <Seat
              key={id}
              id={id}
              x={x}
              y={y}
              status={status[id]}
              onClick={setActive}
            />
          ))}
        </div>

        {/* BOOKING MODAL */}
        <BookingModal
        open={!!active}
        tableId={active}
        date={date}
        onClose={() => setActive(null)}
        onConfirm={async (name, lineUserId) => {
          if (!active) return;

          try {
            console.log("LINE UID:", lineUserId);

            // 🚀 send everything to Apps Script (we’ll update bookSeat next)
            await bookSeat(active, name, date, lineUserId);

            await loadWithSpinner();
            setActive(null);
          } catch (err) {
            console.error("❌ booking error:", err);
          }
        }}
      />
      </div>
    </div>
  );
}