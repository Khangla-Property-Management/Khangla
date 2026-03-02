import { Bed, Bath, Square, ChevronDown } from "lucide-react";

export default function PropertyCard({ property, onSelect }: any) {
  return (
    <div className="bg-white rounded-3xl border border-[#E2E8F0] hover:shadow-lg transition-all">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={property.img}
          alt="home"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-extrabold">
          {property.location}
        </h3>

        <div className="flex gap-4 text-xs text-slate-500 mt-3 mb-4">
          <span className="flex items-center gap-1">
            <Bed size={14} /> {property.beds}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={14} /> {property.baths}
          </span>
          <span className="flex items-center gap-1">
            <Square size={14} /> {property.sqft}
          </span>
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <p className="text-lg font-bold text-[#5B7C99]">
            Nu. {property.price.toLocaleString()}
          </p>

          <button
            onClick={() => onSelect(property)}
            className="p-3 bg-[#2F3E4D] text-white rounded-xl"
          >
            <ChevronDown size={20} className="-rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}
