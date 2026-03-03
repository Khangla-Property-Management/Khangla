"use client";

import { Suspense } from "react";
import RentalResults from "./components/RentalResults";

export default function RentalsPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center font-bold text-slate-400">
          Loading Khangla...
        </div>
      }
    >
      <RentalResults />
    </Suspense>
  );
}
