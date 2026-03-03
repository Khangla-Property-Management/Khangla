"use client";

import React, { useState, useEffect } from 'react';
import {
  COLOR_PRIMARY,
  SecondaryAccentTextStyle,
  PrimaryTextStyle
} from '../types/global-constants';

/**
 * @title Footer Component
 * @description Standard site footer with links and copyright.
 */
export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  useEffect(() => { setCurrentYear(new Date().getFullYear()); }, []);
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4" style={PrimaryTextStyle}>Khangla</h3>
            <p className="text-sm text-gray-400">Connecting renters and owners with care.</p>
          </div>
          {/* Column 2: Explore */}
          <div>
            <h3 className="text-lg font-bold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#listings" className="text-gray-400 hover:text-white transition duration-150">Featured Rentals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Place Locations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Tenant Resources</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/about-us" className="text-gray-400 hover:text-white transition duration-150">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-150">Terms & Privacy</a></li>
            </ul>
          </div>

          {/* Column 4: List Your Property CTA */}
          <div>
            <h3 className="text-lg font-bold mb-4">For Owners</h3>
            <p className="text-sm text-gray-400 mb-4">Join our network of property managers and owners.</p>
            <a href="owner"
              className="bg-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition duration-150 shadow-md"
              style={SecondaryAccentTextStyle}
            >Owner Login</a>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-8">
          <p className="text-center text-sm text-gray-400">© {currentYear} Khangla. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};