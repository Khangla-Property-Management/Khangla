"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { mockListing, Coordinates } from './types/listing';
import { DetailsCard } from './components/details-card';
import { SidebarCard } from './components/sidebar-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const IMAGES = [
  "https://picsum.photos/id/1025/800/600",
  "https://picsum.photos/id/1018/800/600",
  "https://picsum.photos/id/1015/800/600",
];

export default function ListingPage() {
  const [coordinates, setCoordinates] = useState<Coordinates>(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Geocoding Logic
  useEffect(() => {
    const getCoords = async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(mockListing.address)}&limit=1`;
        const res = await axios.get(url, { headers: { 'User-Agent': 'ListingApp/1.0' } });
        if (res.data?.[0]) {
          setCoordinates([parseFloat(res.data[0].lat), parseFloat(res.data[0].lon)]);
        } else {
          setCoordinates([27.4728, 89.6390]); // Fallback Thimphu
        }
      } catch (e) {
        setCoordinates([27.4728, 89.6390]);
      }
    };
    getCoords();
  }, []);

  // Carousel Logic
  useEffect(() => {
    const id = setInterval(() => setCurrentImage((p) => (p + 1) % IMAGES.length), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6 lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto pr-1">
            
            {/* IMAGE SECTION */}
            <section>
              <div className="mb-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                  Nu {mockListing.monthlyPrice} / month
                </span>
              </div>

              <div className="flex gap-2">
                <div className="h-[240px] flex-1 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                  <img src={IMAGES[currentImage]} alt="Property" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-2">
                  {IMAGES.map((url, i) => (
                    <button key={i} onClick={() => setCurrentImage(i)} className="w-16 h-14 rounded-md overflow-hidden border">
                      <img src={url} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* HEADER */}
            <section className="border-b pb-5">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{mockListing.title}</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-lg text-gray-700 font-medium">
                <StatItem icon={<BedIcon />} label={`${mockListing.beds} Beds`} />
                <StatItem icon={<BathIcon />} label={`${mockListing.baths} Baths`} />
                <StatItem icon={<SqftIcon />} label={`${mockListing.sqft} SqFt`} />
              </div>
            </section>

            <DetailsCard data={mockListing} />
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <SidebarCard data={mockListing} coords={coordinates} />
          </div>
        </div>
      </div>

      {/* MOBILE ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t p-3 shadow-2xl z-50 flex justify-between items-center">
        <div>
          <span className="text-xl font-bold text-green-600 block leading-none">Nu {mockListing.monthlyPrice}</span>
          <span className="text-xs text-gray-500">/ month</span>
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">Showing</Button>
          <Link href="/booking">
            <Button size="sm" className="font-bold">APPLY NOW</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Internal Stat Helper
const StatItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="flex items-center gap-2">
    <div className="text-gray-600">{icon}</div>
    <span>{label}</span>
  </span>
);

// Keep your existing SVG icons here...
const BedIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10h14a4 4 0 0 1 4 4v5H3V10z" fill="currentColor" opacity="0.15"/><path d="M3 19V6m0 8h18M6 10h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const BathIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 11h14v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z" fill="currentColor" opacity="0.15"/><path d="M7 5a3 3 0 0 0-3 3v3h16V9a2 2 0 0 0-2-2h-4M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const SqftIcon = () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M9 9h6v6H9V9z" fill="currentColor" opacity="0.15"/></svg>;