import React from 'react';
import { Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ListingData } from '@/types/listing';

export const DetailsCard: React.FC<{ data: ListingData }> = ({ data }) => (
  <div className="p-6 rounded-xl bg-white shadow-md border border-gray-100">
    <h3 className="text-xl font-semibold text-primary mb-3">Detailed Description</h3>
    <p className="text-gray-600 leading-relaxed">{data.description}</p>
    
    <Separator className="my-6" />
    
    <h3 className="text-xl font-semibold text-primary mb-4">Home Comforts</h3>
    <div className="grid grid-cols-2 gap-4 text-gray-700">
      {data.amenities.map((a) => (
        <div key={a} className="flex items-center space-x-2">
          <Check className="w-4 h-4 text-green-600" aria-hidden />
          <span>{a}</span>
        </div>
      ))}
    </div>
    
    <Separator className="my-6" />
    
    <h3 className="text-xl font-semibold text-primary mb-4">Amenities & Features</h3>
    <ul className="list-disc list-inside space-y-1 text-gray-700">
      {data.features.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
    
    <Separator className="my-6" />
    
    <h3 className="text-xl font-semibold text-primary mb-4">Pet Policy</h3>
    <p className="text-gray-600">{data.petPolicy}</p>
  </div>
);