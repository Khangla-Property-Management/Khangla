"use client";

import React from 'react';
import { ArrowRight } from 'lucide-react';

// Import all components and constants
import { Navbar } from './components/navbar';
import { SearchCard } from './components/search-card';
import { ListingCard } from './components/listing-card';
import { HowItWorksSection } from './components/how-it-works';
import { CtaSection } from './components/cta-section';
import { Footer } from './components/footer';
import {
  featuredListings,
  COLOR_PRIMARY,
  COLOR_BG_LIGHT,
  COLOR_HOVER_PRIMARY,
  COLOR_NEUTRAL_TEXT,
  PrimaryStyle,
  PrimaryTextStyle
} from './types/global-constants';


/**
 * @title Main Application Layout
 * @description The primary component that assembles all modular sections.
 */
const App = () => (
  <div className="min-h-screen bg-white antialiased font-sans">
    <style>{`
      .fade-in { opacity: 0; transform: scale(1.01); animation: fadeIn 900ms ease-in-out forwards; will-change: opacity, transform; }
      @keyframes fadeIn { to { opacity: 1; transform: none; } }
      /* Hero image background layered with gradients */
      .hero-bg {
        position: relative;
        overflow: hidden;
        background: linear-gradient(180deg, ${COLOR_BG_LIGHT} 0%, #f8f5f0 100%);
      }
      .hero-bg::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none; /* ensure clicks pass through */
        background-image: url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop');
        background-size: cover;
        background-position: center;
        filter: saturate(0.9) brightness(0.95);
        opacity: 0.22;
        z-index: 0;
      }
      .hero-bg::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none; /* ensure clicks pass through */
        background: radial-gradient(1000px 500px at 80% 20%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 40%, transparent 70%),
                        linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%);
        z-index: 0;
      }
      .hero-blob {
        position: absolute; right: -120px; top: -80px;
        width: 520px; height: 520px; border-radius: 50%;
        pointer-events: none; /* ensure clicks pass through */
        background: radial-gradient(closest-side, ${COLOR_PRIMARY} 0%, ${COLOR_HOVER_PRIMARY} 60%, transparent 100%);
        filter: blur(60px); opacity: 0.12; animation: float 8s ease-in-out infinite;
        z-index: 0;
      }
      .hero-content { position: relative; z-index: 1; }
      @keyframes float { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-12px) } }
    `}</style>
    <Navbar />
    <main>
      {/* Hero Section */}
      <section className="pt-16 md:pt-20 pb-24 md:py-28 hero-bg" style={{ backgroundColor: COLOR_BG_LIGHT }}>
        <div className="hero-blob" aria-hidden="true" />
        <div className="hero-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="lg:pr-12">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ color: COLOR_NEUTRAL_TEXT }}>
              Find your serene <span style={PrimaryTextStyle}>home</span>.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              Discover trusted listings in Thimphu, Paro, and across the country. Start your journey to a peaceful dwelling.
            </p>
            <a
              href="#listings"
              className="inline-flex items-center px-6 py-3 text-base font-semibold rounded-full text-white shadow-xl transition hover:scale-[1.02]"
              style={PrimaryStyle}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLOR_HOVER_PRIMARY)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLOR_PRIMARY)}
            >
              View featured rentals
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
          {/* Search Card */}
          <SearchCard />
        </div>
      </section>

      {/* Featured Listings Section */}
      <section id="listings" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-4" style={{ color: COLOR_NEUTRAL_TEXT }}>Featured rentals</h2>
          <p className="text-lg md:text-xl text-gray-600 text-center mb-16">Selected properties offering peace, quality, and great locations.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Final CTA Section */}
      <CtaSection />
    </main>

    {/* Footer */}
    <Footer />
  </div>
);

export default App;