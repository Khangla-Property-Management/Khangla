import React from 'react';
import { Search, TrendingUp, Home } from 'lucide-react';
import {
  COLOR_BG_LIGHT,
  COLOR_NEUTRAL_TEXT,
  PrimaryStyle,
  PrimaryTextStyle
} from '../types/global-constants';

/**
 * @title How It Works Section Component
 * @description Explains the three-step rental process.
 */
export const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 md:py-28" style={{ backgroundColor: COLOR_BG_LIGHT }}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-extrabold text-center mb-4" style={{ color: COLOR_NEUTRAL_TEXT }}>How it works</h2>
      <p className="text-lg md:text-xl text-gray-600 text-center mb-16">From browsing to signing, we make the transition effortless.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
        <div className="p-8 bg-white rounded-xl shadow-lg transition hover:shadow-2xl">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-xl text-white text-2xl font-bold mb-6" style={PrimaryStyle}>
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-3" style={PrimaryTextStyle}>1. Discover</h3>
          <p className="text-gray-600">Explore homes and apartments near your preferred city or town.</p>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-lg transition hover:shadow-2xl">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-xl text-white text-2xl font-bold mb-6" style={PrimaryStyle}>
            <TrendingUp className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-3" style={PrimaryTextStyle}>2. Apply</h3>
          <p className="text-gray-600">Submit secure digital applications tailored for rental requirements.</p>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-lg transition hover:shadow-2xl">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-xl text-white text-2xl font-bold mb-6" style={PrimaryStyle}>
            <Home className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-semibold mb-3" style={PrimaryTextStyle}>3. Move in</h3>
          <p className="text-gray-600">Finalize your lease quickly and settle in with ease.</p>
        </div>
      </div>
    </div>
  </section>
);