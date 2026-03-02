"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RoomSelect } from "./room-select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useCallback, useMemo, useRef, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";

export function BookingSheet({
  open,
  onOpenChangeAction,
  defaultRoom,
  defaultCheckinTime,
  resetKey,
}: {
  open: boolean;
  onOpenChangeAction: (v: boolean) => void;
  defaultRoom?: string;
  defaultCheckinTime?: string;
  resetKey?: number;
}) {
  const rooms = ["Room 1", "Room 2", "Room 3", "Room 4", "Room 5", "Room 6"];
  const countries = [
    { code: "+975", name: "Bhutan", flag: "🇧🇹" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+977", name: "Nepal", flag: "🇳🇵" },
    { code: "+880", name: "Bangladesh", flag: "🇧🇩" },
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  ];
  const [country, setCountry] = useState<(typeof countries)[number]>(
    countries[0]
  );

  const [timeSlot, setTimeSlot] = useState<string>("");
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const timeSlots = [
    "Morning (7:00-12:00)",
    "Afternoon (12:00-16:00)",
    "Evening (16:00-19:00)",
  ];
  const formatDate = useCallback((value?: string | null) => {
    if (!value) return "";
    const d = new Date(`${value}T00:00:00`);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const openPicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    const el = ref.current;
    if (!el) return;
    el.focus();
    try {
      const anyEl = el as unknown as { showPicker?: () => void };
      if (typeof anyEl.showPicker === "function") {
        anyEl.showPicker();
      } else {
        el.click();
      }
    } catch {
      el.click();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChangeAction}>
      <SheetContent
        side="right"
        className="w-[480px] sm:w-[560px] max-w-[92vw]"
      >
        <SheetHeader>
          <SheetTitle>New Booking</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Fill out the form to create a new room booking.
          </p>
        </SheetHeader>
        <div
          key={resetKey}
          className="mt-6 grid gap-4 w-full max-w-[420px] bg-card text-card-foreground border p-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              className="bg-background text-foreground placeholder:text-muted-foreground border-input"
            />
          </div>
          <div className="grid gap-2 ">
            <Label>Room</Label>
            <RoomSelect
              key={defaultRoom ?? "empty"}
              rooms={rooms}
              value={defaultRoom}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="time-slot">Time Slot</Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  id="time-slot"
                  variant="outline"
                  className={`justify-between w-full ${
                    timeSlot ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span>{timeSlot || "Select time slot"}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[240px]">
                {timeSlots.map((s) => (
                  <DropdownMenuItem key={s} onClick={() => setTimeSlot(s)}>
                    {s}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="start-date">Start Date</Label>
              <div className="relative">
                <Input
                  id="start-date"
                  type="text"
                  value={startDate ? formatDate(startDate) : "Start"}
                  readOnly
                  onClick={() => openPicker(startDateRef)}
                  placeholder="Start"
                  className={`bg-background placeholder:text-muted-foreground border-input cursor-pointer pr-10 ${
                    !startDate ? "text-muted-foreground" : "text-foreground"
                  }`}
                />
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 opacity-50" />
                </div>
                <input
                  ref={startDateRef}
                  id="start-date-hidden"
                  type="date"
                  tabIndex={-1}
                  className="sr-only"
                  onChange={(e) => {
                    const value = e.target.value || null;
                    setStartDate(value);
                    const needsEnd =
                      !endDate || (value && endDate && endDate < value);
                    if (needsEnd) {
                      setTimeout(() => openPicker(endDateRef), 50);
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="end-date">End Date</Label>
              <div className="relative">
                <Input
                  id="end-date"
                  type="text"
                  value={endDate ? formatDate(endDate) : "End"}
                  readOnly
                  onClick={() => openPicker(endDateRef)}
                  placeholder="End"
                  className={`bg-background placeholder:text-muted-foreground border-input cursor-pointer pr-10 ${
                    !endDate ? "text-muted-foreground" : "text-foreground"
                  }`}
                />
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 opacity-50" />
                </div>
                <input
                  ref={endDateRef}
                  id="end-date-hidden"
                  type="date"
                  tabIndex={-1}
                  className="sr-only"
                  onChange={(e) => {
                    const value = e.target.value || null;
                    if (value && startDate && value < startDate) {
                      setEndDate(startDate);
                      setStartDate(value);
                    } else {
                      setEndDate(value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <div className="flex items-center rounded-lg border border-input bg-background text-foreground overflow-hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 px-3 h-10 rounded-none rounded-l-lg border-r border-input bg-accent text-accent-foreground hover:bg-accent/80"
                    aria-label="Country code"
                  >
                    <span className="text-xl leading-none">{country.flag}</span>
                    <span className="text-sm">{country.code}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[220px]">
                  {countries.map((c) => (
                    <DropdownMenuItem
                      key={c.code}
                      className="gap-2"
                      onClick={() => setCountry(c)}
                    >
                      <span className="text-xl leading-none">{c.flag}</span>
                      <span>{c.name}</span>
                      <span className="ml-auto text-muted-foreground">
                        {c.code}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                id="phone"
                placeholder="Phone number"
                className="flex-1 h-10 border-0 bg-transparent focus-visible:ring-0 focus-visible:outline-none placeholder:text-muted-foreground rounded-none rounded-r-lg"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              className="border-input text-foreground"
              onClick={() => onOpenChangeAction(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onOpenChangeAction(false)}
            >
              Save
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
