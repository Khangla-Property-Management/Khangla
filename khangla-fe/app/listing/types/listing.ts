export interface ListingData {
  title: string;
  monthlyPrice: number;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  description: string;
  amenities: string[];
  features: string[];
  petPolicy: string;
}

export type Coordinates = [number, number] | null;

export const mockListing: ListingData = {
  title: 'Charming 3BR Home in Downtown',
  monthlyPrice: 2500,
  beds: 3,
  baths: 2.5,
  sqft: 1800,
  address: 'Norzin Lam, Thimphu, Bhutan',
  description: 'This gorgeous house features an open-concept living area, a modern kitchen with a large island, and plenty of natural light. Conveniently located near local shops and restaurants.',
  amenities: ['Central Washer/Dryer', 'Central Air Conditioning', 'Gas Range', 'Fenced Yard'],
  features: ['Long-term leasing allowed', 'Community Pool', 'Reserved Parking', 'Community Play Area'],
  petPolicy: 'Pets allowed with an additional deposit of $300 and monthly pet rent of $50.',
};