"use client";

import { useEffect, useState } from "react";
import { seatPos } from "@/lib/seatPositions";
import Seat from "./Seat";
import BookingModal from "./BookingModal";
import { fetchSeats, bookSeat } from "@/lib/api";
import ZoneBlock from "./ZoneBlock";
import ZoneLabel from "./ZoneLabel";

export default function SeatMap() {
  const [active, setActive] = useState<string | null>(null);
  const [status, setStatus] = useState<
    Record<string, "available" | "booked" | "paid">
  >({});

  async function load() {
    const data = await fetchSeats();
    const newStatus: any = {};
    Object.keys(seatPos).forEach((id) => (newStatus[id] = "available"));
    data.marked.forEach(({ id, status }) => (newStatus[id] = status));
    setStatus(newStatus);
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // ✅ Horizontal scroll container for mobile
    <div className="w-full overflow-x-auto overflow-y-hidden px-2">
      {/* ✅ Wide canvas so seats don't cram on mobile */}
      <div
        className="relative mx-auto mt-4 bg-black rounded-xl"
        style={{ width: "700px", height: "900px" }} // You can tweak later
      >

        {/* BACKGROUND (z-0) */}
        <img
          src="/seatmap.png"
          alt="Seat Map"
          className="w-full h-full object-cover pointer-events-none select-none"
        />

        {/* 🌫 FOG (z-10) */}
        <div className="fog-layer absolute inset-0 z-10 pointer-events-none" />

        {/* EVERYTHING ABOVE FOG (z-20) */}
        <div className="absolute inset-0 z-20">

          {/* ===== ZONE LABELS ===== */}
          <ZoneLabel label="ATTIC" x={88} y={25} />
          <ZoneLabel label="VIP LEFT" x={24} y={28} />
          <ZoneLabel label="VIP RIGHT" x={76} y={28} />

          {/* STAGE / DJ / FLOOR / BAR */}
          <ZoneBlock label="STAGE" x={50} y={18} w={40} h={6} />
          <ZoneBlock label="DJ BOOTH" x={50} y={24} w={30} h={4} />
          <ZoneBlock label="DANCE FLOOR" x={50} y={31} w={36} h={6} />
          <ZoneBlock label="BAR" x={50} y={86} w={18} h={6} />

          {/* SEATS */}
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

        {/* ✅ BOOKING MODAL */}
        <BookingModal
          open={!!active}
          tableId={active}
          onClose={() => setActive(null)}
          onConfirm={async (name) => {
            if (!active) return;
            try {
              await bookSeat(active, name);
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