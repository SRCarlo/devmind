import React, { useState } from 'react';
import { 
  FiSearch, 
  FiRotateCcw,
  FiFilter,
  FiX,
  FiSliders
} from 'react-icons/fi';
import { FilterState, SkillLevel, TopicCategory } from '../../types/mindmap';
import { useProgress } from '../../app/providers/ProgressProvider';

interface MindMapControlsProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalVisible: number;
  totalAll: number;
}

const CATEGORIES: Array<TopicCategory | 'all'> = [
  'all',
  'Fundamentals',
  'HTML & CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'State Management',
  'Build Tools',
  'Testing',
  'Backend Awareness',
  'Architecture'
];

const LEVELS: Array<{ id: SkillLevel | 'all'; label: string }> = [
  { id: 'all', label: 'All Levels' },
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'professional', label: 'Architect' }
];

const STATUSES: Array<{ id: FilterState['status']; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'locked', label: 'Locked' },
  { id: 'bookmarked', label: 'Saved' }
];

export const MindMapControls: React.FC<MindMapControlsProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalVisible,
  totalAll
}) => {
  const { progress, setLearningMode } = useProgress();
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);

  const hasActiveFilters = 
    filters.search.trim() !== '' || 
    filters.level !== 'all' || 
    filters.category !== 'all' || 
    filters.status !== 'all';

  return (
    <div className="space-y-2">
      {/* Compact Main Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Search input */}
        <div className="relative flex-1 min-w-[160px] max-w-xs">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 theme-text-muted w-3.5 h-3.5 opacity-70" />
          <input
            type="text"
            value={filters.search}
            onChange={e => onFilterChange({ search: e.target.value })}
            placeholder="Search nodes..."
            className="w-full pl-8 pr-7 py-1.5 rounded-xl theme-bg-input border theme-border theme-text-heading text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
          {filters.search && (
            <button
              onClick={() => onFilterChange({ search: '' })}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Level Quick Pills */}
        <div className="hidden sm:flex items-center gap-1">
          {LEVELS.map(lvl => (
            <button
              key={lvl.id}
              onClick={() => onFilterChange({ level: lvl.id })}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                filters.level === lvl.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'theme-bg-subtle theme-text-muted hover:theme-text-heading border theme-border'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        {/* Active Experience Tier Indicator & Filter Toggle */}
        <div className="flex items-center gap-2">
          {/* Active Tier Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            <FiSliders className="w-3 h-3" />
            <span className="capitalize">
              {progress.mode === 'beginner' ? '🌱 Beginner Tier (Lvl 0-1)' : progress.mode === 'pro' ? '🏛️ Pro Architect (Lvl 2-4)' : '⚡ Standard Tier (All)'}
            </span>
          </div>

          <button
            onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
              showFiltersDropdown || hasActiveFilters
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'theme-bg-subtle border-transparent theme-text-muted hover:theme-text-heading hover:theme-border'
            }`}
          >
            <FiFilter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1 px-2 py-1 text-xs text-rose-500 hover:text-rose-600 font-semibold transition-colors"
              title="Reset all filters"
            >
              <FiRotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          <span className="text-[11px] theme-text-muted font-mono hidden md:inline">
            <strong className="theme-text-heading font-bold">{totalVisible}</strong>/{totalAll} nodes
          </span>
        </div>
      </div>

      {/* Expandable Advanced Filter Panel */}
      {showFiltersDropdown && (
        <div className="p-3 rounded-xl theme-bg-subtle border theme-border space-y-2.5 transition-all text-xs">
          {/* Quick Experience Tier Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="theme-text-muted font-semibold text-[11px] uppercase tracking-wider min-w-[60px]">
              Tier Mode:
            </span>
            <div className="flex flex-wrap items-center gap-1">
              {(['beginner', 'standard', 'pro'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setLearningMode(m)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all border ${
                    progress.mode === m
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                      : 'theme-bg-card theme-border theme-text-muted hover:theme-text-heading'
                  }`}
                >
                  {m === 'beginner' ? '🌱 Beginner (Foundations)' : m === 'standard' ? '⚡ Standard (Fullstack)' : '🏛️ Pro (Architecture & Systems)'}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="theme-text-muted font-semibold text-[11px] uppercase tracking-wider min-w-[60px]">
              Status:
            </span>
            <div className="flex flex-wrap items-center gap-1">
              {STATUSES.map(s => (
                <button
                  key={s.id}
                  onClick={() => onFilterChange({ status: s.id })}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                    filters.status === s.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'theme-bg-card theme-text-muted hover:theme-text-heading border theme-border'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Domain Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="theme-text-muted font-semibold text-[11px] uppercase tracking-wider min-w-[60px]">
              Domain:
            </span>
            <div className="flex flex-wrap items-center gap-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => onFilterChange({ category: cat })}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                    filters.category === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'theme-bg-card theme-text-muted hover:theme-text-heading border theme-border'
                  }`}
                >
                  {cat === 'all' ? 'All Domains' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
