import React from 'react';
import {
  COLOR_PRIMARY,
  COLOR_HOVER_PRIMARY,
  SecondaryAccentTextStyle,
  COLOR_NEUTRAL_MEDIUM
} from '../types/global-constants';

/**
 * @title Call to Action Section Component
 * @description Encourages property owners to list their properties.
 */
export const CtaSection = () => (
  <section className="py-20">
    {/* Local styles to handle smooth hover without JS */}
    <style>{`
      .cta-btn {
        background-color: #ffffff;
        color: ${COLOR_PRIMARY};
        transition: background-color 200ms ease, color 200ms ease, transform 200ms ease, box-shadow 200ms ease;
      }
      .cta-btn:hover {
        background-color: ${/* Light gray from palette */ ''}${COLOR_NEUTRAL_MEDIUM};
        color: ${/* Dark neutral text */ ''}#222222;
      }
      .cta-btn:active { transform: scale(0.99); }
    `}</style>
    <div
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center p-12 rounded-2xl shadow-xl"
      style={{
        backgroundImage: `linear-gradient(135deg, ${COLOR_PRIMARY} 0%, ${COLOR_HOVER_PRIMARY} 100%)`,
      }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-white leading-tight tracking-tight mb-4">Own property? List with Khangla.</h2>
      <p className="text-base md:text-lg text-white/90 mb-10">Reach a reliable pool of renters across the country.</p>
      <a
        href="#"
        className="cta-btn inline-flex items-center px-10 py-4 text-lg font-bold rounded-xl shadow-xl hover:scale-[1.03]"
      >
        Start listing today
      </a>
    </div>
  </section>
);