import React from 'react';
import { FiBookOpen, FiZap, FiCheckCircle } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { useProgress } from '../../app/providers/ProgressProvider';

export const StatsOverview: React.FC = () => {
  const { progress } = useProgress();

  const stats = [
    {
      label: 'Learning Streak',
      value: `${progress.streakDays} Days`,
      sub: 'Top 10% consistency',
      icon: <FaFire className="w-5 h-5 text-amber-500" />,
      color: 'border-amber-500/30 bg-amber-500/5'
    },
    {
      label: 'Total XP Earned',
      value: `${progress.xp.toLocaleString()} XP`,
      sub: `Level ${progress.level} Developer`,
      icon: <FiZap className="w-5 h-5 text-indigo-500" />,
      color: 'border-indigo-500/30 bg-indigo-500/5'
    },
    {
      label: 'Topics Finished',
      value: `${progress.completedTopics.length}`,
      sub: `${progress.inProgressTopics.length} currently studying`,
      icon: <FiCheckCircle className="w-5 h-5 text-emerald-500" />,
      color: 'border-emerald-500/30 bg-emerald-500/5'
    },
    {
      label: 'Lessons Completed',
      value: `${progress.completedLessons.length}`,
      sub: `${progress.completedLessons.length * 20}m study time`,
      icon: <FiBookOpen className="w-5 h-5 text-cyan-500" />,
      color: 'border-cyan-500/30 bg-cyan-500/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((st, idx) => (
        <div
          key={idx}
          className={`p-5 rounded-2xl border ${st.color} theme-bg-card shadow-sm flex items-center gap-4 transition-colors duration-200`}
        >
          <div className="p-3 rounded-xl theme-bg-subtle border theme-border flex-shrink-0">
            {st.icon}
          </div>
          <div>
            <div className="text-xs font-semibold theme-text-muted">{st.label}</div>
            <div className="text-xl sm:text-2xl font-extrabold theme-text-heading tracking-tight font-mono">
              {st.value}
            </div>
            <div className="text-[11px] theme-text-muted mt-0.5">{st.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
