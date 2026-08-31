import React, { useState } from 'react';
import { 
  FiLayers, 
  FiSearch, 
  FiExternalLink, 
  FiBookmark
} from 'react-icons/fi';
import { TECHNOLOGIES_DATA } from '../data/technologiesData';
import { useProgress } from '../app/providers/ProgressProvider';
import { Badge } from '../components/ui/Badge';
import { getTopicIcon } from '../utils/iconMap';

export const TechnologiesPage: React.FC = () => {
  const { progress, toggleBookmarkTech } = useProgress();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'React', 'TypeScript', 'JavaScript', 'HTML & CSS', 'Build Tools', 'Testing', 'Backend Awareness', 'DevOps'];

  const filteredTech = TECHNOLOGIES_DATA.filter(tech => {
    if (selectedCategory !== 'all' && tech.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        tech.name.toLowerCase().includes(q) ||
        tech.description.toLowerCase().includes(q) ||
        tech.tagline.toLowerCase().includes(q) ||
        tech.keyFeatures.some(f => f.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 pb-20 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-semibold">
            <FiLayers className="w-3.5 h-3.5" />
            <span>Developer Ecosystem Directory</span>
          </div>
          <h1 className="text-3xl font-extrabold theme-text-heading tracking-tight font-display">
            Modern Technologies & Tools ({TECHNOLOGIES_DATA.length})
          </h1>
          <p className="text-sm theme-text-muted max-w-2xl">
            Explore industry-standard frontend, full-stack, testing, and dev tools with documentation links and ecosystem roles.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 theme-text-muted w-4 h-4 opacity-70" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search technology..."
            className="w-full theme-bg-input border theme-border rounded-xl pl-10 pr-4 py-2 text-xs theme-text-heading placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'theme-bg-card border theme-border theme-text-muted hover:theme-text-heading'
            }`}
          >
            {cat === 'all' ? 'All Technologies' : cat}
          </button>
        ))}
      </div>

      {/* Technology Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTech.map(tech => {
          const isBookmarked = progress.bookmarkedTech.includes(tech.id);

          return (
            <div
              key={tech.id}
              className="p-6 rounded-3xl theme-bg-card border theme-border hover:border-indigo-500 shadow-sm flex flex-col justify-between transition-all duration-150 space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: `${tech.color}25`, border: `1px solid ${tech.color}60` }}
                  >
                    {getTopicIcon(tech.iconName, 'w-6 h-6')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="cyan" size="sm">{tech.category}</Badge>
                    <button
                      onClick={() => toggleBookmarkTech(tech.id)}
                      className="theme-text-muted hover:text-indigo-500 p-1 rounded-lg"
                      aria-label="Bookmark technology"
                    >
                      <FiBookmark className={isBookmarked ? 'w-4 h-4 text-indigo-500 fill-indigo-500' : 'w-4 h-4'} />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold theme-text-heading leading-snug">{tech.name}</h3>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {tech.popularityScore}% Pop.
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">{tech.tagline}</p>
                  <p className="text-xs theme-text-muted mt-2 line-clamp-3 leading-relaxed">
                    {tech.description}
                  </p>
                </div>

                {/* Key Features */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tech.keyFeatures.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2.5 py-0.5 rounded-md theme-bg-subtle border theme-border text-[11px] theme-text-main font-mono"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t theme-border">
                <a
                  href={tech.documentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1.5"
                >
                  <span>Official Docs</span>
                  <FiExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] theme-text-muted font-mono">
                  {tech.ecosystemRole}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
