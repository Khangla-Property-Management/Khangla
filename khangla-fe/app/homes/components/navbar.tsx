"use client";

import React from 'react';
import {
  COLOR_PRIMARY,
  COLOR_HOVER_PRIMARY,
  PrimaryStyle,
  PrimaryTextStyle
} from '../types/global-constants';

/**
 * @title Navbar Component
 * @description Site navigation header for Khangla.
 */
export const Navbar = () => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200/60">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center">
      {/* Navigation links only (brand and sign-in removed) */}
      <nav className="flex items-center text-gray-400 font-medium">
        <a href="#listings" className="px-2 sm:px-3 lg:px-4 py-1 sm:py-2 hover:text-gray-700 transition">Rentals</a>
        <span className="mx-3 sm:mx-5 lg:mx-8 h-5 w-px bg-gray-200/40 hidden sm:inline-block" aria-hidden="true" />
        <a href="#how-it-works" className="px-2 sm:px-3 lg:px-4 py-1 sm:py-2 hover:text-gray-700 transition">Our Process</a>
        <span className="mx-3 sm:mx-5 lg:mx-8 h-5 w-px bg-gray-200/40 hidden sm:inline-block" aria-hidden="true" />
        <a href="#" className="px-2 sm:px-3 lg:px-4 py-1 sm:py-2 hover:text-gray-700 transition">Property Owners</a>
      </nav>
    </div>
  </header>
);