"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeroSection from "./HeroSection";
import SortToggle from "./SortToggle";
import PropertyGrid from "./PropertyGrid";
import PropertyModal from "./PropertyModal";

const PROPERTIES = [
  { id: 1, price: 25000, location: "Changzamtog, Thimphu", beds: 3, baths: 2, type: "Apartment", sqft: 1200, tag: "Premium", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" },
  { id: 2, price: 35000, location: "Babesa, Thimphu", beds: 4, baths: 3, type: "Villa", sqft: 2500, tag: "New", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" },
  { id: 3, price: 15000, location: "Motithang, Thimphu", beds: 1, baths: 1, type: "Studio", sqft: 600, tag: "Trending", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800" },
  { id: 4, price: 22000, location: "Olarongchu, Thimphu", beds: 2, baths: 2, type: "Apartment", sqft: 1100, tag: "Eco", img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800" },
];

export default function RentalResults() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isNewestFirst, setIsNewestFirst] = useState(true);

  const filtered = useMemo(() => {
    const locQ = searchParams.get("location")?.toLowerCase() || "";
    const typeQ = searchParams.get("type") || "";
    const priceQ = parseInt(searchParams.get("price") || "999999");

    let result = PROPERTIES.filter((p) => {
      return (
        p.location.toLowerCase().includes(locQ) &&
        (typeQ === "" || p.type === typeQ) &&
        p.price <= priceQ
      );
    });

    return [...result].sort((a, b) =>
      isNewestFirst ? b.id - a.id : a.price - b.price
    );
  }, [searchParams, isNewestFirst]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-[#2F3E4D]">
      <HeroSection />

      <div className="max-w-7xl mx-auto px-6 pb-32">
        <SortToggle
          count={filtered.length}
          isNewestFirst={isNewestFirst}
          toggle={() => setIsNewestFirst(!isNewestFirst)}
        />

        <PropertyGrid
          properties={filtered}
          onSelect={setSelectedProperty}
        />
      </div>

      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  );
}
