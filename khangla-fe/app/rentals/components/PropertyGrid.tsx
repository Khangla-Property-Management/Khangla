import PropertyCard from "./PropertyCard";

export default function PropertyGrid({ properties, onSelect }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((item: any) => (
        <PropertyCard
          key={item.id}
          property={item}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
