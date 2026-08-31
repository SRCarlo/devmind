import React from 'react';

export const AnimatedBrandTitle: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'text-base font-bold',
    md: 'text-lg font-extrabold',
    lg: 'text-3xl sm:text-4xl font-black'
  };

  return (
    <span className={`inline-flex items-center font-display tracking-tight ${sizeClasses[size]} ${className}`}>
      <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-extrabold">
        DevMind
      </span>
    </span>
  );
};
