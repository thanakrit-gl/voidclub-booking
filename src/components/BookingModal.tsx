"use client";

import { seatInfo } from "@/lib/seatInfo";
import { useState } from "react";

export default function BookingModal({
  open,
  tableId,
  date,
  onClose,
  onConfirm,
}: {
  open: boolean;
  tableId: string | null;
  date: string;
  onClose: () => void;
  onConfirm: (name: string) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false); // ⭐ NEW STATE

  if (!open || !tableId) return null;
  const info = seatInfo[tableId];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => !loading && !confirmed && onClose()}
      />

      <div className="relative bg-black/80 border border-gray-600 p-5 rounded-xl w-full max-w-sm text-white">

        {/* --------------------------------------------------------- */}
        {/* SUCCESS SCREEN (INSIDE SAME MODAL) */}
        {/* --------------------------------------------------------- */}
        {confirmed ? (
          <div className="text-center">
            <div className="text-5xl mb-4 text-emerald-400">✓</div>

            <h2 className="text-xl font-bold mb-2 text-emerald-300">
              Reservation Confirmed!
            </h2>

            <p className="text-sm text-gray-300">
              Table <span className="text-white font-semibold">{tableId}</span>
            </p>

            <p className="text-sm text-gray-300">
              Under name:{" "}
              <span className="text-white font-semibold">{name}</span>
            </p>

            <p className="text-xs text-gray-400 mt-4 mb-4">
              Please arrive before <span className="text-white font-semibold">23:00</span> on{" "}
              <span className="text-white font-semibold">{date}</span>.
            </p>

            <button
              className="px-4 py-2 bg-emerald-600 rounded-md hover:bg-emerald-500"
              onClick={() => {
                setConfirmed(false);
                setName("");
                onClose(); // close modal after OK
              }}
            >
              OK
            </button>
          </div>
        ) : (
          /* --------------------------------------------------------- */
          /* BOOKING FORM SCREEN */
          /* --------------------------------------------------------- */
          <div>
            <h2 className="text-xl font-bold mb-2">{tableId}</h2>
            <p className="text-sm mb-1">{info.zone}</p>

            <p className="text-sm text-emerald-300 mb-4">
              Minimum Spend: {info.price.toLocaleString()} THB
            </p>

            <input
              className="w-full bg-black/40 border border-gray-600 rounded-md px-3 py-2 mb-4"
              placeholder="Enter booking name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-3 py-2 bg-gray-700 rounded-md disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!name.trim()) return;
                  setLoading(true);

                  try {
                    await onConfirm(name.trim()); // SeatMap handles refresh
                    setConfirmed(true); // ⭐ switch to success screen
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading || !name.trim()}
                className="px-3 py-2 bg-emerald-600 rounded-md flex items-center gap-2 disabled:opacity-40"
              >
                {loading ? (
                  <span className="animate-spin border-2 border-white/40 border-t-white rounded-full w-4 h-4" />
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}