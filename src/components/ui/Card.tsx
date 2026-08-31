import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends HTMLMotionProps<'div'> {
  interactive?: boolean;
  glow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  interactive = false,
  glow = false,
  className,
  children,
  ...props
}) => {
  return (
    <motion.div
      whileHover={interactive ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={twMerge(
        clsx(
          'rounded-2xl bg-slate-900/70 backdrop-blur-xl border border-slate-800/80 p-6 text-slate-100 transition-colors duration-200',
          interactive && 'hover:border-indigo-500/40 hover:bg-slate-900/90 cursor-pointer shadow-lg hover:shadow-indigo-500/10',
          glow && 'glow-primary',
          className
        )
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
