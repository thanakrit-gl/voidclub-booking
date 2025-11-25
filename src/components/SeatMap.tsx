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

  async function load() {
    setLoading(true);

    try {
      const data = await fetchSeats(date);
      const newStatus: Record<string, "available" | "booked"> = {};

      // Default: all seats available
      Object.keys(seatPos).forEach((id) => (newStatus[id] = "available"));

      // Detect if this date has NO rows at all
      if (!data.marked || data.marked.length === 0) {
        setNoSchedule(true);
      } else {
        setNoSchedule(false);
      }

      // Fill booked seats
      data.marked.forEach(({ id, status }: { id: string; status: "booked" }) => {
        newStatus[id] = status;
      });

      setStatus(newStatus);
    } catch (err) {
      console.error("failed loading seats:", err);
      const fallback: Record<string, "available"> = {};
      Object.keys(seatPos).forEach((id) => (fallback[id] = "available"));
      setStatus(fallback);
    }

    setLoading(false);
  }

  useEffect(() => {
    setNoSchedule(false);
    setLoading(true);
    load();                         // load once only
    return () => {};                // no interval
  }, [date]);

  // ❌ NO SCHEDULE FOR THIS DATE
  if (noSchedule) {
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

        {/* SPINNER OVERLAY */}
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

        {/* FOG EFFECT */}
        <div className="fog-layer absolute inset-0 z-10 pointer-events-none" />

        {/* LABELS + SEATS */}
        <div className="absolute inset-0 z-20">
          {/* Zone Labels */}
          <ZoneLabel label="ATTIC" x={82} y={26} />
          <ZoneLabel label="VIP LEFT" x={28} y={28} />
          <ZoneLabel label="VIP RIGHT" x={72} y={28} />

          {/* Blocks */}
          <ZoneBlock label="STAGE" x={50} y={18} w={65} h={13} />
          <ZoneBlock label="DJ BOOTH" x={50} y={24} w={22} h={4} />
          <ZoneBlock label="DANCE FLOOR" x={50} y={31} w={32} h={6} />
          <ZoneBlock label="BAR" x={50} y={86} w={18} h={6} />

          {/* Seats */}
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
          onClose={() => setActive(null)}
          onConfirm={async (name) => {
            if (!active) return;
            try {
              await bookSeat(active, name, date);
              await load();
              setActive(null);
            } catch (err) {
              console.error("❌ bookSeat error:", err);
            }
          }}
        />
      </div>
    </div>
  );
}