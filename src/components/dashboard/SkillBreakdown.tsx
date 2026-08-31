import React from 'react';
import { useProgress } from '../../app/providers/ProgressProvider';
import { ProgressBar } from '../ui/ProgressBar';

export const SkillBreakdown: React.FC = () => {
  const { progress } = useProgress();

  const categories = [
    { name: 'HTML & Semantic Web', score: progress.completedTopics.includes('html-basics') ? 100 : 40, color: 'emerald' as const },
    { name: 'CSS & Modern Layouts', score: progress.completedTopics.includes('css-fundamentals') ? 95 : 60, color: 'cyan' as const },
    { name: 'JavaScript & ES6+ Core', score: progress.completedTopics.includes('js-fundamentals') ? 100 : 70, color: 'amber' as const },
    { name: 'React Components & Hooks', score: progress.completedTopics.includes('react-fundamentals') ? 85 : 30, color: 'indigo' as const },
    { name: 'TypeScript Type Safety', score: progress.completedTopics.includes('typescript-basics') ? 90 : 25, color: 'purple' as const },
    { name: 'Frontend Architecture & Systems', score: progress.completedTopics.includes('frontend-architecture') ? 100 : 15, color: 'indigo' as const }
  ];

  return (
    <div className="p-6 rounded-2xl theme-bg-card border theme-border shadow-sm space-y-5 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold theme-text-heading tracking-tight">Domain Mastery Breakdown</h3>
          <p className="text-xs theme-text-muted">Calculated across your knowledge graph progress</p>
        </div>
        <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold">Active Sync</span>
      </div>

      <div className="space-y-4">
        {categories.map((cat, idx) => (
          <div key={idx} className="space-y-1.5">
            <ProgressBar
              value={cat.score}
              label={cat.name}
              showPercent
              color={cat.color}
              size="sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
