import React from 'react';
import { motion } from 'framer-motion';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-0.5 shadow-md shadow-indigo-500/20 cursor-pointer select-none ${sizeMap[size]} ${className}`}
    >
      {/* Inner geometric SVG logo */}
      <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center overflow-hidden relative">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
        >
          {/* Background gradient definitions */}
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366F1" />
              <stop offset="0.5" stopColor="#A855F7" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {/* Central Synapse / Node Structure */}
          <circle cx="16" cy="16" r="3.5" fill="url(#logo-grad)" />
          <circle cx="8" cy="10" r="2" fill="#818CF8" />
          <circle cx="24" cy="10" r="2" fill="#C084FC" />
          <circle cx="16" cy="25" r="2" fill="#38BDF8" />

          {/* Connecting Quantum Synapse Lines */}
          <line x1="8" y1="10" x2="16" y2="16" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="10" x2="16" y2="16" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="25" x2="16" y2="16" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Subtle Outer Hex Ring Orbit */}
          <polygon
            points="16,3 27,9 27,23 16,29 5,23 5,9"
            stroke="url(#logo-grad)"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            fill="none"
          />
        </svg>
      </div>
    </motion.div>
  );
};
