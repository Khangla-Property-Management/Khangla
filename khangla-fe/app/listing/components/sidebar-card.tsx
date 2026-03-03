import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ListingData, Coordinates } from '@/types/listing';

// Fix import path (component is in components/, map is one level up)
const OpenStreetMap = dynamic(() => import('./OpenStreetMap'), { ssr: false });

interface SidebarProps {
  data: ListingData;
  coords: Coordinates;
}

export const SidebarCard: React.FC<SidebarProps> = ({ data, coords }) => {
  return (
    <div className="rounded-xl bg-white border border-gray-200/60 shadow p-3 sticky top-6">
      <div className="text-center mb-2 pb-2 border-b">
        <span className="text-xl font-bold text-green-600 mr-1">Nu {data.monthlyPrice}</span>
        <span className="text-xs text-gray-600">/ month</span>
      </div>
      
      <div className="map-container">
        {coords ? (
          <OpenStreetMap position={coords} address={data.address} height={260} />
        ) : (
          <div className="h-[260px] flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 text-xs">
            Loading Map...
          </div>
        )}
        <p className="text-xs text-gray-500 mt-2 text-center">{data.address}</p>
      </div>

      <div className="mt-4 space-y-2">
        <Link href="/booking">
          <Button className="w-full h-10 text-xs font-bold" variant="default">APPLY NOW</Button>
        </Link>
        <Button className="w-full h-10 text-xs font-bold" variant="outline">Request a Showing</Button>
      </div>
    </div>
  );
};