import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercent?: boolean;
  color?: 'indigo' | 'emerald' | 'cyan' | 'purple' | 'amber';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercent = false,
  color = 'indigo',
  size = 'sm',
  className
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colorStyles = {
    indigo: 'bg-gradient-to-r from-indigo-500 to-indigo-400 shadow-indigo-500/30',
    emerald: 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-emerald-500/30',
    cyan: 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-cyan-500/30',
    purple: 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-purple-500/30',
    amber: 'bg-gradient-to-r from-amber-500 to-orange-400 shadow-amber-500/30'
  };

  const heightStyles = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={twMerge('w-full', className)}>
      {(label || showPercent) && (
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-medium">
          {label && <span>{label}</span>}
          {showPercent && <span className="font-mono text-slate-300 font-semibold">{percentage}%</span>}
        </div>
      )}
      <div className={clsx('w-full bg-slate-800/80 rounded-full overflow-hidden border border-white/5 p-[1px]', heightStyles[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={clsx('h-full rounded-full shadow-sm', colorStyles[color])}
        />
      </div>
    </div>
  );
};

interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 80,
  strokeWidth = 6,
  color = '#6366F1',
  children
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-slate-800"
        />
        {/* Animated fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          strokeLinecap="round"
          fill="transparent"
        />
      </svg>
      {children && <div className="absolute inset-0 flex items-center justify-center">{children}</div>}
    </div>
  );
};
