"use client";

import { Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface OwnerLandingProps {
  onGetStarted: () => void;
}

export default function OwnerLanding({ onGetStarted }: OwnerLandingProps) {
  return (
    <div className="relative z-10 w-full max-w-6xl px-4 py-12">
      {/* Primary card */}
      <div className="mx-auto w-full max-w-3xl rounded-xl border-0 bg-transparent p-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Streamlined Management at Your Fingertips
          </h1>
          <p className="text-base text-white/80 md:text-lg">
            Essential tools designed for transparency, growth, and peace of
            mind.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button size="lg" onClick={onGetStarted} className="min-w-40">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="min-w-40">
              Learn More
            </Button>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Owner overview"
              className="h-12 rounded-lg bg-background pl-10 pr-10"
            />
            <Home className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <h3 className="text-base font-semibold">
            Live Occupancy & Rent Status
          </h3>
          <div className="mt-3 w-full rounded-lg bg-muted/40 p-2">
            <Image
              src="/image-1771864104654.png"
              alt="Live occupancy preview"
              width={800}
              height={400}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Visualize real-time payment status and unit availability.
          </p>
        </div>

        <div className="rounded-xl border border-border/60 bg-card p-5">
          <h3 className="text-base font-semibold">Financial Transactions</h3>
          <div className="mt-3 w-full rounded-lg bg-muted/40 p-2">
            <img
              src="/image-1771865026297.png"
              alt="Owner billing preview"
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Comprehensive ledger of income and billing history.
          </p>
        </div>

        <div className="rounded-xl border border-border/60 bg-card p-5">
          <h3 className="text-base font-semibold">Public Listings & Vacancy</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Publish vacancies and track interest efficiently.
          </p>
        </div>
      </div>
    </div>
  );
}
