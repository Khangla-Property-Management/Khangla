import { X } from "lucide-react";

export default function PropertyModal({ property, onClose }: any) {
  if (!property) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full max-w-xl rounded-3xl overflow-hidden">
        <div className="h-48 overflow-hidden relative">
          <img
            src={property.img}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 text-white p-2 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold mb-4">
            {property.location}
          </h3>

          <p className="text-[#5B7C99] font-bold mb-6">
            Nu. {property.price}
          </p>

          <button
            onClick={onClose}
            className="w-full bg-[#2F3E4D] text-white py-3 rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
