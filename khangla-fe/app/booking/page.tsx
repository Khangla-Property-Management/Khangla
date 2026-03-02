"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BookingHeader } from "./components/booking-header";
import { BookingGrid, defaultRooms } from "./components/booking-grid";
import { BookingSheet } from "./components/booking-sheet";
import { BookingList } from "./components/booking-list";

type ViewMode = "grid" | "list";

function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function BookingPage() {
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  });
  const [view, setView] = useState<ViewMode>("grid");
  const [open, setOpen] = useState(false);
  const [sheetDefaults, setSheetDefaults] = useState<{
    room?: string;
    checkinTime?: string;
  }>({});
  const [sheetKey, setSheetKey] = useState(0);
  const rooms = defaultRooms;
  const hours = useMemo(() => Array.from({ length: 13 }, (_, i) => 7 + i), []);

  const prevDay = () =>
    setDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1));
  const nextDay = () =>
    setDate((d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1));

  return (
    <div className="space-y-4">
      <BookingHeader
        dateLabel={formatDate(date)}
        onPrevDay={prevDay}
        onNextDay={nextDay}
        view={view}
        onChangeView={setView}
        rightSlot={
          <Button
            className="gap-2"
            onClick={() => {
              setSheetDefaults({});
              setSheetKey((k) => k + 1);
              setOpen(true);
            }}
          >
            <Plus className="h-4 w-4" /> Booking Room
          </Button>
        }
      />

      {view === "grid" ? (
        <BookingGrid
          rooms={rooms}
          hours={hours}
          onAddAction={({ room, hour }) => {
            const time = `${String(hour).padStart(2, "0")}:00`;
            setSheetDefaults({ room, checkinTime: time });
            setOpen(true);
          }}
        />
      ) : (
        <BookingList />
      )}

      <BookingSheet
        resetKey={sheetKey}
        open={open}
        onOpenChangeAction={setOpen}
        defaultRoom={sheetDefaults.room}
        defaultCheckinTime={sheetDefaults.checkinTime}
      />
    </div>
  );
}
