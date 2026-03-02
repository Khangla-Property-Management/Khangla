"use client";

import { cn } from "@/lib/utils";

export type BookingStatus = "finished" | "approved" | "pending" | "cancelled";

export function StatusBadge({ status }: { status: BookingStatus }) {
  const map: Record<BookingStatus, string> = {
    finished: "bg-emerald-100 text-emerald-700 border-emerald-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    cancelled: "bg-rose-100 text-rose-700 border-rose-200",
  };

  const labelMap: Record<BookingStatus, string> = {
    finished: "Finished",
    approved: "Approved",
    pending: "Pending",
    cancelled: "Cancelled",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-3 py-0.5 text-xs font-semibold",
        map[status],
      )}
    >
      {labelMap[status]}
    </span>
  );
}
