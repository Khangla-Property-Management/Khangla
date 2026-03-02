"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function RoomSelect({
  rooms,
  value,
  onChange,
}: {
  rooms: string[];
  value?: string;
  onChange?: (v: string) => void;
}) {
  const [selected, setSelected] = useState<string>(value ?? "");
  const display = selected || "Select room";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`justify-between w-full ${
            selected ? "" : "text-muted-foreground"
          }`}
        >
          {display}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-[240px]">
        {rooms.map((r) => (
          <DropdownMenuItem
            key={r}
            onClick={() => {
              setSelected(r);
              onChange?.(r);
            }}
          >
            {r}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
