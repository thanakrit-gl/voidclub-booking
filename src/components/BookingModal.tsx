"use client";

import { seatInfo } from "@/lib/seatInfo";
import { useState } from "react";

export default function BookingModal({
  open,
  tableId,
  onClose,
  onConfirm,
}: {
  open: boolean;
  tableId: string | null;
  onClose: () => void;
  onConfirm: (name: string) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open || !tableId) return null;
  const info = seatInfo[tableId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => !loading && onClose()}
      />

      <div className="relative backdrop p-5 rounded-xl w-full max-w-sm text-white">
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
            type="button"
            onClick={async () => {
              if (!name.trim()) return;
              setLoading(true);
              try {
                await onConfirm(name.trim());
              } finally {
                setLoading(false);
                setName("");
              }
            }}
            disabled={loading || name.trim() === ""}
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
    </div>
  );
}