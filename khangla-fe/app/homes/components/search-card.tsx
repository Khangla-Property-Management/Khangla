"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search } from 'lucide-react';
import {
  COLOR_PRIMARY,
  COLOR_NEUTRAL_MEDIUM,
  COLOR_HOVER_PRIMARY,
  COLOR_NEUTRAL_TEXT,
  PrimaryTextStyle,
  PrimaryStyle,
  PrimaryBorderStyle
} from '../types/global-constants';

export const SearchCard = () => {
  const router = useRouter();
  
  // State to capture user input
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct the URL parameters
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (type) params.append('type', type);
    if (price) params.append('price', price);

    // Navigate to your rentals page (make sure this folder exists in /app/rentals)
    router.push(`/rentals?${params.toString()}`);
  };

  return (
    <div className="relative w-full">
      <div
        className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-200/70 hover:shadow-2xl transition group"
        style={PrimaryBorderStyle}
      >
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-2xl font-bold flex items-center gap-2" style={PrimaryTextStyle}>
            <Search className="w-6 h-6" /> Find your next home
          </h3>
          <span className="hidden md:inline-block text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">Smart filters</span>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4">
          <div className="relative">
            <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="City or town (e.g., Thimphu, Paro)"
              className="w-full pl-10 pr-4 py-3 rounded-2xl text-gray-800 border bg-gray-50 hover:bg-white transition shadow-sm outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: COLOR_NEUTRAL_MEDIUM }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              className="w-full px-4 py-3 rounded-2xl text-gray-800 border bg-gray-50 outline-none"
              style={{ borderColor: COLOR_NEUTRAL_MEDIUM }}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Property type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Studio">Studio</option>
            </select>
            <select
              className="w-full px-4 py-3 rounded-2xl text-gray-800 border bg-gray-50 outline-none"
              style={{ borderColor: COLOR_NEUTRAL_MEDIUM }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Max monthly price</option>
              <option value="15000">Nu. 15,000</option>
              <option value="25000">Nu. 25,000</option>
              <option value="45000">Nu. 45,000+</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 text-white py-3 rounded-2xl font-semibold shadow-lg active:scale-[0.98] flex items-center justify-center transition"
              style={PrimaryStyle}
            >
              <Search className="w-5 h-5 mr-2" />
              Search homes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};