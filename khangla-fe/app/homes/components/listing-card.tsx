"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { MapPin, Bed, Bath, Star, Heart } from "lucide-react";
import {
  COLOR_PRIMARY,
  COLOR_HOVER_PRIMARY,
  COLOR_SECONDARY_ACCENT,
  COLOR_NEUTRAL_TEXT,
  PrimaryTextStyle,
  Listing,
} from "../types/global-constants";

/**
 * @title Listing Card Component
 * @description Displays an individual property listing. Requires a 'listing' prop.
 * @param {object} listing - Property object with title, location, price, beds, baths, imgUrl.
 */
export const ListingCard: React.FC<{ listing: Listing }> = ({ listing }) => {
  const images =
    listing.gallery && listing.gallery.length > 0
      ? listing.gallery
      : [listing.imgUrl];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="group bg-white rounded-3xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02] border border-gray-100">
      <div className="relative">
        {/* Image slider */}
        <div className="overflow-hidden rounded-t-3xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((src, idx) => (
              <div key={idx} className="min-w-full will-change-transform">
                <img
                  className="aspect-[4/3] w-full object-cover"
                  src={
                    src ||
                    listing.imgUrl ||
                    "https://images.unsplash.com/photo-1505691723518-36a5ac3b2d88?q=80&w=1600&auto=format&fit=crop"
                  }
                  alt={listing?.title || "Property Image"}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const backup =
                      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop";
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = backup;
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="flex items-center text-[11px] font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">
            <Star className="w-3 h-3 mr-1" /> Featured
          </span>
          {images.length > 1 && (
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-gray-900/80 text-white shadow-sm">
              Gallery
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          aria-label="Add to favorites"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white transition shadow-sm"
        >
          <Heart className="w-4 h-4 text-red-500" />
        </button>

        {/* Slider controls */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/30 rounded-full px-3 py-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition transform ${
                  idx === current
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3
            className="text-lg md:text-xl font-semibold line-clamp-2"
            style={{ color: COLOR_NEUTRAL_TEXT }}
          >
            {listing?.title || "Property Name"}
          </h3>
          <span className="text-xs px-2 py-1 rounded-md bg-green-100 text-green-700 font-medium">
            Verified
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 flex items-center">
          <MapPin className="w-4 h-4 mr-1 text-gray-400" />
          {listing?.location || "Unknown Location"}
        </p>

        <div className="flex items-center gap-4 text-gray-700 mb-5 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-6 p-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100">
            <span className="flex items-center text-sm font-medium">
              <Bed className="w-4 h-4 mr-1" style={PrimaryTextStyle} />{" "}
              {listing?.beds || 0} Beds
            </span>
            <span className="flex items-center text-sm font-medium">
              <Bath className="w-4 h-4 mr-1" style={PrimaryTextStyle} />{" "}
              {listing?.baths || 0} Baths
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center pr-2">
          <span
            className="text-xl md:text-2xl font-extrabold leading-tight"
            style={{ color: COLOR_SECONDARY_ACCENT }}
          >
            <span className="text-sm font-bold text-gray-500 mr-1">Nu.</span>
            <span className="text-gray-700">
              {(listing?.price || "Nu. 0").replace(/^Nu\.\s*/, "")}
            </span>
            <span className="text-sm md:text-base font-normal text-gray-500 ml-1 align-middle">
              /mo
            </span>
          </span>
          <a
            href="listing"
            className="inline-flex items-center justify-center px-5 h-11 rounded-full text-white text-sm md:text-[15px] font-semibold tracking-wide shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95"
            style={{ backgroundColor: COLOR_PRIMARY }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = COLOR_HOVER_PRIMARY)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = COLOR_PRIMARY)
            }
          >
            View details
          </a>
        </div>
      </div>
    </div>
  );
};
