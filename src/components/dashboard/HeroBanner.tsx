import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGrid, FiArrowRight, FiBookOpen } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { useProgress } from '../../app/providers/ProgressProvider';
import { Button } from '../ui/Button';
import { CircularProgress } from '../ui/ProgressBar';

export const HeroBanner: React.FC = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const totalTopics = 12;
  const masteryPercentage = Math.round((progress.completedTopics.length / totalTopics) * 100);

  return (
    <div className="relative overflow-hidden rounded-3xl theme-bg-card border theme-border p-6 sm:p-8 shadow-sm transition-colors duration-200">
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/25 text-xs font-semibold"
            >
              <FiBookOpen className="w-3.5 h-3.5" />
              <span>
                {progress.mode === 'beginner' ? '🌱 Beginner Tier Active' : progress.mode === 'pro' ? '🏛️ Pro Architect Tier Active' : '⚡ Standard Tier Active'}
              </span>
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/25 text-xs font-semibold"
            >
              <FaFire className="w-3.5 h-3.5 text-amber-500" />
              <span>Day {progress.streakDays} Streak</span>
            </motion.span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold theme-text-muted font-display">Welcome to</span>
              <span className="text-xl sm:text-2xl font-extrabold font-display bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                DevMind
              </span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold theme-text-heading tracking-tight leading-snug font-display"
            >
              Visualize. Build. Master.
              <motion.span 
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                }}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                className="block bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-[length:200%_auto] bg-clip-text text-transparent font-extrabold"
              >
                The Visual Brain for Modern Developers
              </motion.span>
            </motion.h1>
          </div>

          <p className="text-xs sm:text-sm theme-text-muted leading-relaxed font-medium">
            Explore structured knowledge graphs for Python, Java, JavaScript, React 19, SQL, and System Architecture with live in-browser code sandboxes.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              size="md"
              variant="primary"
              icon={<FiGrid />}
              onClick={() => navigate('/mindmap')}
            >
              Explore Knowledge Map
            </Button>
            <Button
              size="md"
              variant="secondary"
              icon={<FiBookOpen />}
              onClick={() => navigate('/courses')}
            >
              Browse Full Syllabus
            </Button>
          </div>
        </div>

        {/* Study Progress Card */}
        <div className="p-6 rounded-2xl theme-bg-subtle border theme-border shadow-sm flex flex-col items-center text-center w-full md:w-auto min-w-[240px]">
          <div className="mb-3">
            <CircularProgress value={masteryPercentage} size={92} strokeWidth={8} color="#4F46E5">
              <div className="text-center">
                <span className="font-mono text-xl font-extrabold theme-text-heading">
                  {masteryPercentage}%
                </span>
                <span className="block text-[9px] theme-text-muted font-semibold uppercase tracking-wider">
                  Mastery
                </span>
              </div>
            </CircularProgress>
          </div>

          <h3 className="text-sm font-bold theme-text-heading mb-0.5">Engineering Mastery</h3>
          <p className="text-xs theme-text-muted mb-4">
            {progress.completedTopics.length} of {totalTopics} Modules Mastered
          </p>

          <Button
            size="sm"
            variant="outline"
            className="w-full text-xs"
            onClick={() => navigate('/progress')}
          >
            <span>View Mastery Stats</span>
            <FiArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};
