// --- COLOR CONSTANTS (User-Provided Palette) ---
export const COLOR_PRIMARY = '#547794'; // Deep Blue-Grey (Primary action color)
export const COLOR_BG_LIGHT = '#F6F3EE'; // Off-White/Cream (Main Light Background)
export const COLOR_NEUTRAL_MEDIUM = '#E0E0E0'; // Light Gray (Borders/Dividers)
export const COLOR_SECONDARY_ACCENT = '#5D121F'; // Deep Burgundy/Maroon (For strong contrast text/price)
export const COLOR_HOVER_PRIMARY = '#446884'; // Slightly darker Blue-Grey (For button hovers)
export const COLOR_NEUTRAL_TEXT = '#222222'; // Darker text

// Helper Styles (for inline application)
export const PrimaryStyle = { backgroundColor: COLOR_PRIMARY };
export const PrimaryTextStyle = { color: COLOR_PRIMARY };
export const SecondaryAccentTextStyle = { color: COLOR_SECONDARY_ACCENT };
export const PrimaryBorderStyle = { borderColor: COLOR_PRIMARY };


// --- DATA TYPES ---
export interface Listing {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  imgUrl: string;
  gallery?: string[]; // optional gallery for image transitions
}

// --- DATA ---
export const featuredListings: Listing[] = [
  {
    id: 1,
    title: "Traditional Thimphu Lhakhang-style Home",
    location: "Thimphu, Bhutan",
    price: "Nu. 25,000",
    beds: 4,
    baths: 3,
    imgUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691723518-36a5ac3b2d88?q=80&w=1600&auto=format&fit=crop'
    ],
  },
  {
    id: 2,
    title: "Paro Valley Modern Apartment",
    location: "Paro, Bhutan",
    price: "Nu. 18,000",
    beds: 2,
    baths: 2,
    imgUrl: 'https://images.unsplash.com/photo-1505691723499-7f3bd6f1d6b9?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505691723499-7f3bd6f1d6b9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop'
    ],
  },
  {
    id: 3,
    title: "Punakha Riverside Retreat",
    location: "Punakha, Bhutan",
    price: "Nu. 32,000",
    beds: 5,
    baths: 4,
    imgUrl: 'https://images.unsplash.com/photo-1505692794403-0216e2ec6b9b?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505692794403-0216e2ec6b9b?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493666438817-866a91353ca6?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1464146072230-91cabc6fe0d9?q=80&w=1600&auto=format&fit=crop'
    ],
  },
  {
    id: 4,
    title: "Phuentsholing Commercial Unit",
    location: "Phuentsholing, Bhutan",
    price: "Nu. 12,000",
    beds: 1,
    baths: 1,
    imgUrl: 'https://images.unsplash.com/photo-1505691723502-42b94f8a76e9?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1505691723502-42b94f8a76e9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?q=80&w=1600&auto=format&fit=crop'
    ],
  },
];