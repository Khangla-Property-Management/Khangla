"use client";

import { ArrowUpDown, Clock, MoreHorizontal, Phone } from "lucide-react";
import { StatusBadge, type BookingStatus } from "./status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type BookingItem = {
  id: string;
  name: string;
  room: string;
  time: string;
  phone: string;
  status: BookingStatus;
};

const sampleBookings: BookingItem[] = [
  {
    id: "ID1928309",
    name: "Renata",
    room: "Room 1",
    time: "07:00 PM → 08:00 PM",
    phone: "0812 3290 0992",
    status: "finished",
  },
  {
    id: "ID1928310",
    name: "Marcel",
    room: "Room 2",
    time: "07:00 PM → 08:00 PM",
    phone: "0812 3290 0992",
    status: "cancelled",
  },
  {
    id: "ID1928311",
    name: "Damar",
    room: "Room 3",
    time: "07:00 PM → 10:00 PM",
    phone: "0812 3290 0992",
    status: "approved",
  },
  {
    id: "ID1928312",
    name: "Renata",
    room: "Room 1",
    time: "09:00 PM → 10:00 PM",
    phone: "0812 3290 0992",
    status: "pending",
  },
  {
    id: "ID1928313",
    name: "Dr. Yosep",
    room: "Room 2",
    time: "09:00 PM → 10:00 PM",
    phone: "0812 3290 0992",
    status: "approved",
  },
  {
    id: "ID1928314",
    name: "Jauhari",
    room: "Room 1",
    time: "11:00 PM → 12:00 PM",
    phone: "0812 3290 0992",
    status: "approved",
  },
  {
    id: "ID1928315",
    name: "Anita",
    room: "Room 2",
    time: "11:00 PM → 12:00 PM",
    phone: "0812 3290 0992",
    status: "approved",
  },
];

export function BookingList({
  bookings = sampleBookings,
}: {
  bookings?: BookingItem[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[160px]">
            <div className="flex items-center gap-1">
              <span>ID</span>
              <ArrowUpDown className="h-3.5 w-3.5" />
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-1">
              <span>Name</span>
              <ArrowUpDown className="h-3.5 w-3.5" />
            </div>
          </TableHead>
          <TableHead className="w-[140px]">Room</TableHead>
          <TableHead className="w-[220px]">Time</TableHead>
          <TableHead className="w-[220px]">Phone</TableHead>
          <TableHead className="w-[140px] text-right pr-8">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((b) => (
          <TableRow key={b.id}>
            <TableCell>
              <span className="font-mono text-[13px] text-muted-foreground">
                {b.id}
              </span>
            </TableCell>
            <TableCell>
              <span className="font-medium text-foreground">{b.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-muted-foreground">{b.room}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{b.time}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{b.phone}</span>
              </div>
            </TableCell>
            <TableCell className="pr-8">
              <div className="flex items-center justify-end gap-3">
                <StatusBadge status={b.status} />
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
                  aria-label="More actions"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
