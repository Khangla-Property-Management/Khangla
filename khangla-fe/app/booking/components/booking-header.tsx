"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Grid2x2, List } from "lucide-react";

type ViewMode = "grid" | "list";

export function BookingHeader({
  dateLabel,
  onPrevDay,
  onNextDay,
  view,
  onChangeView,
  rightSlot,
}: {
  dateLabel: string;
  onPrevDay: () => void;
  onNextDay: () => void;
  view: ViewMode;
  onChangeView: (v: ViewMode) => void;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-semibold tracking-tight">Oasis</h1>
        <div className="flex items-center rounded-md border bg-background">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={onPrevDay}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="px-3 text-sm font-medium text-foreground/80 min-w-[120px] text-center">
            {dateLabel}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={onNextDay}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex rounded-md border">
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="icon"
            className="h-9 w-9"
            onClick={() => onChangeView("grid")}
            aria-label="Grid view"
          >
            <Grid2x2 className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="h-9" />
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="icon"
            className="h-9 w-9"
            onClick={() => onChangeView("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        {rightSlot}
      </div>
    </div>
  );
}