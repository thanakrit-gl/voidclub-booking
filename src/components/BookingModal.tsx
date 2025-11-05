"use client";

import { seatInfo } from "@/lib/seatInfo";
import { getDeposit } from "@/lib/pricing";
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
  const deposit = getDeposit(tableId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => !loading && onClose()}
      />

      <div className="relative backdrop p-5 rounded-xl w-full max-w-sm text-white">

        <h2 className="text-xl font-bold mb-2">{tableId}</h2>
        <p className="text-sm mb-1">{info.zone}</p>

        <p className="text-sm text-emerald-300">
          Minimum Spend: {info.price.toLocaleString()} THB
        </p>
        <p className="text-xs text-pink-300 mb-4">
          Deposit Required Now: {deposit.toLocaleString()} THB
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
              setLoading(true);

              // ✅ Mark seat booked first (stored in sheet / backend)
              await onConfirm(name);

              // ✅ Redirect to deposit payment page
              window.location.href =
                `https://api.elementpay.io/merchant/light/#!/?amount=${deposit}&key=92696a2d-5700-11f0-9d5e-0206e0436cc1&env=sandbox`;

              setLoading(false);
            }}
            disabled={loading || name.trim() === ""}
            className="px-3 py-2 bg-emerald-600 rounded-md flex items-center gap-2 disabled:opacity-40"
          >
            {loading ? (
              <span className="animate-spin border-2 border-white/40 border-t-white rounded-full w-4 h-4"></span>
            ) : (
              "Confirm & Pay Deposit"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}