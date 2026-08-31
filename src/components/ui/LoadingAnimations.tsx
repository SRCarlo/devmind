import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { BrandLogo } from './BrandLogo';
import { 
  FaReact, 
  FaPython, 
  FaJava, 
  FaNodeJs, 
  FaDocker, 
  FaGitAlt 
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiJavascript, 
  SiPostgresql, 
  SiLinux, 
  SiNextdotjs,
  SiSpringboot
} from 'react-icons/si';

/**
 * Top Page Route Transition Loading Bar
 */
export const RouteProgressBar: React.FC = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 320);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[120] overflow-hidden pointer-events-none">
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ repeat: Infinity, duration: 0.75, ease: 'easeInOut' }}
        className="w-1/2 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_12px_#6366F1]"
      />
    </div>
  );
};

const TECH_ORBIT_ICONS = [
  { icon: <FaReact className="w-5 h-5 text-cyan-400" />, name: 'React 19', color: '#61DAFB' },
  { icon: <FaPython className="w-5 h-5 text-amber-400" />, name: 'Python 3.12', color: '#3776AB' },
  { icon: <FaJava className="w-5 h-5 text-orange-500" />, name: 'Java 21', color: '#ED8B00' },
  { icon: <SiTypescript className="w-5 h-5 text-blue-400" />, name: 'TypeScript', color: '#3178C6' },
  { icon: <SiPostgresql className="w-5 h-5 text-sky-400" />, name: 'PostgreSQL', color: '#336791' },
  { icon: <SiSpringboot className="w-5 h-5 text-emerald-400" />, name: 'Spring Boot', color: '#6DB33F' },
  { icon: <SiNextdotjs className="w-5 h-5 text-white" />, name: 'Next.js 15', color: '#FFFFFF' },
  { icon: <FaDocker className="w-5 h-5 text-cyan-500" />, name: 'Docker', color: '#2496ED' },
  { icon: <SiLinux className="w-5 h-5 text-yellow-400" />, name: 'Linux', color: '#FCC624' }
];

const COMPILATION_LOGS = [
  'Mounting AST Visualizer & Knowledge Nodes...',
  'Compiling Python 3.12 & Java 21 Sandbox Runtimes...',
  'Reconciling React 19 State & Virtual DOM...',
  'Connecting PostgreSQL & SQL Relational Engine...',
  'Ready to Code 🚀'
];

/**
 * Full Screen Tech Page Loader Animation with Orbiting Tech Icons
 */
export const FullScreenPageLoader: React.FC = () => {
  const location = useLocation();
  const [showFullLoader, setShowFullLoader] = useState(false);
  const [logIndex, setLogIndex] = useState(0);
  const [progressVal, setProgressVal] = useState(15);

  useEffect(() => {
    setShowFullLoader(true);
    setProgressVal(15);
    setLogIndex(0);

    const progressTimer = setInterval(() => {
      setProgressVal(prev => (prev < 90 ? prev + 25 : prev));
    }, 80);

    const logTimer = setInterval(() => {
      setLogIndex(prev => (prev < COMPILATION_LOGS.length - 1 ? prev + 1 : prev));
    }, 110);

    const timer = setTimeout(() => {
      setProgressVal(100);
      setTimeout(() => {
        setShowFullLoader(false);
      }, 120);
    }, 420);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
      clearInterval(logTimer);
    };
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {showFullLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[110] pointer-events-none flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md text-white select-none overflow-hidden p-4"
        >
          {/* Cyber Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(99,102,241,0.2),transparent)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center space-y-6">
            {/* Orbiting Animated Tech Icons Stage */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Outer Quantum Orbit Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-indigo-500/30"
              />

              {/* Reverse Inner Glow Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-cyan-500/20"
              />

              {/* Orbiting Tech Icons */}
              {TECH_ORBIT_ICONS.slice(0, 6).map((item, idx) => {
                const angle = (idx * (360 / 6)) * (Math.PI / 180);
                const radius = 70; // px
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={item.name}
                    animate={{
                      scale: [0.9, 1.15, 0.9],
                      rotate: [0, 360]
                    }}
                    transition={{
                      scale: { repeat: Infinity, duration: 2 + idx * 0.3, ease: 'easeInOut' },
                      rotate: { repeat: Infinity, duration: 8, ease: 'linear' }
                    }}
                    style={{
                      transform: `translate(${x}px, ${y}px)`
                    }}
                    className="absolute w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-lg flex items-center justify-center backdrop-blur-md"
                    title={item.name}
                  >
                    {item.icon}
                  </motion.div>
                );
              })}

              {/* Center Glowing Brand Logo */}
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <div className="absolute -inset-3 rounded-2xl bg-indigo-500/30 blur-lg animate-pulse" />
                <BrandLogo size="md" className="relative z-10 shadow-2xl" />
              </motion.div>
            </div>

            {/* Title & Live Compilation Log */}
            <div className="space-y-2 w-full">
              <div className="flex items-center justify-center gap-2">
                <span className="font-extrabold text-base tracking-tight font-display bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  DevMind Engine
                </span>
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  {progressVal}%
                </span>
              </div>

              {/* Compilation terminal line */}
              <div className="h-6 flex items-center justify-center gap-1.5 font-mono text-[11px] text-indigo-200">
                <span className="text-cyan-400 animate-pulse">⚡</span>
                <span className="truncate max-w-[280px]">
                  {COMPILATION_LOGS[logIndex]}
                </span>
              </div>

              {/* Quantum Progress Bar */}
              <div className="w-48 mx-auto h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
                  style={{ width: `${progressVal}%` }}
                  transition={{ ease: 'easeOut', duration: 0.15 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Quantum Orbital Spinner
 */
export const QuantumSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; text?: string }> = ({ 
  size = 'md', 
  text 
}) => {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-4 select-none">
      <div className={`relative ${sizeMap[size]}`}>
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 border-r-cyan-400"
        />
        {/* Inner reverse rotating ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          className="absolute inset-1 rounded-full border-2 border-purple-500/20 border-b-purple-500 border-l-pink-400"
        />
        {/* Central glowing core */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-2.5 rounded-full bg-indigo-500 blur-[2px] opacity-70"
        />
      </div>

      {text && (
        <span className="text-xs font-mono text-indigo-400 tracking-wider animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
};

/**
 * Skeleton Shimmer Placeholder
 */
export const SkeletonCard: React.FC<{ rows?: number; className?: string }> = ({ 
  rows = 3, 
  className = '' 
}) => {
  return (
    <div className={`p-5 rounded-2xl theme-bg-card border theme-border space-y-3 animate-pulse ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-black/10 dark:bg-white/10" />
        <div className="space-y-1.5 flex-1">
          <div className="h-3.5 bg-black/10 dark:bg-white/10 rounded w-1/3" />
          <div className="h-2.5 bg-black/10 dark:bg-white/10 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div 
            key={i} 
            className="h-2.5 bg-black/10 dark:bg-white/10 rounded" 
            style={{ width: `${100 - i * 15}%` }} 
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Floating XP Gain Notification Particle
 */
export const FloatingXPParticle: React.FC<{ xp: number; onDone?: () => void }> = ({ xp, onDone }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 0, scale: 0.8 }}
      animate={{ opacity: 0, y: -45, scale: 1.2 }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      onAnimationComplete={onDone}
      className="fixed top-20 right-8 z-50 pointer-events-none px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-mono font-bold text-xs shadow-xl flex items-center gap-1.5"
    >
      <span>⚡</span>
      <span>+{xp} XP</span>
    </motion.div>
  );
};
