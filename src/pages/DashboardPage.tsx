import React from 'react';
import { HeroBanner } from '../components/dashboard/HeroBanner';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { SkillBreakdown } from '../components/dashboard/SkillBreakdown';
import { RecommendedTracks } from '../components/dashboard/RecommendedTracks';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData';
import { useProgress } from '../app/providers/ProgressProvider';
import { Badge } from '../components/ui/Badge';
import { FiAward, FiCheckCircle } from 'react-icons/fi';

export const DashboardPage: React.FC = () => {
  const { progress } = useProgress();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 pb-20">
      {/* Hero Section */}
      <HeroBanner />

      {/* Stats Counter Grid */}
      <StatsOverview />

      {/* Two Column Grid: Skill Breakdown & Recommended Tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SkillBreakdown />
        <RecommendedTracks />
      </div>

      {/* Achievements Showcase */}
      <div className="p-6 rounded-2xl theme-bg-card border theme-border shadow-sm space-y-5 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <FiAward className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold theme-text-heading tracking-tight">Unlocked Study Badges</h3>
              <p className="text-xs theme-text-muted">Milestones achieved on your learning journey</p>
            </div>
          </div>
          <Badge variant="warning">
            {progress.achievements.length} of {ACHIEVEMENTS_DATA.length} Badges
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {ACHIEVEMENTS_DATA.map(ach => {
            const isUnlocked = progress.achievements.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                  isUnlocked
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-200'
                    : 'theme-bg-subtle border-transparent opacity-40'
                }`}
              >
                <div className="text-2xl flex-shrink-0">{ach.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold theme-text-heading truncate">{ach.title}</h4>
                    {isUnlocked && <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
                  </div>
                  <p className="text-[11px] theme-text-muted line-clamp-2 leading-tight">
                    {ach.description}
                  </p>
                  <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold mt-1 block">
                    +{ach.xpReward} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
