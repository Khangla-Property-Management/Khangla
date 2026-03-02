"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const defaultRooms = [
  "Room 1",
  "Room 2",
  "Room 3",
  "Room 4",
  "Room 5",
  "Room 6",
];

function formatTime(hour24: number) {
  const d = new Date();
  d.setHours(hour24, 0, 0, 0);
  return d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function BookingGrid({
  rooms = defaultRooms,
  hours = Array.from({ length: 13 }, (_, i) => 7 + i),
  onAddAction,
}: {
  rooms?: string[];
  hours?: number[];
  onAddAction?: (payload: { room: string; hour: number }) => void;
}) {
  return (
    <div className="rounded-xl border bg-background shadow-sm">
      <div className="grid grid-cols-[140px_repeat(6,minmax(180px,1fr))] items-center border-b">
        <div className="px-5 py-4 text-sm font-medium text-muted-foreground text-center">
          Time
        </div>
        {rooms.map((r) => (
          <div
            key={r}
            className="px-5 py-4 text-sm font-medium text-muted-foreground text-center"
          >
            {r}
          </div>
        ))}
      </div>

      <div className="scroll max-h-[75vh] overflow-auto">
        {hours.map((h) => (
          <div
            key={h}
            className="grid grid-cols-[140px_repeat(6,minmax(180px,1fr))] border-b last:border-b-0"
          >
            <div className="px-5 py-6 text-sm font-medium text-muted-foreground sticky left-0 bg-background text-center">
              {formatTime(h)}
            </div>

            {rooms.map((r) => (
              <div
                key={r + h}
                className="group relative px-3 py-6 border-l hover:bg-muted/40 transition-colors flex items-center justify-center"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity"
                  onClick={() => onAddAction?.({ room: r, hour: h })}
                >
                  <Plus className="h-4 w-4" /> Add
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
