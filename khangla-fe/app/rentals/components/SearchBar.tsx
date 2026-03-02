"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("999999");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    if (price !== "999999") params.set("price", price);
    router.push(`/rentals?${params.toString()}`);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <input
          placeholder="Location..."
          className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Any Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Studio">Studio</option>
        </select>

        <select
          className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="999999">No Max Price</option>
          <option value="15000">Up to Nu. 15k</option>
          <option value="25000">Up to Nu. 25k</option>
          <option value="40000">Up to Nu. 40k</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-[#5B7C99] text-white rounded-xl font-bold"
        >
          Search Listings
        </button>
      </div>
    </div>
  );
}
