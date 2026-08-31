import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiGrid, 
  FiMap, 
  FiBookOpen, 
  FiLayers, 
  FiTrendingUp, 
  FiBookmark, 
  FiSettings, 
  FiInfo
} from 'react-icons/fi';
import { useProgress } from '../../app/providers/ProgressProvider';

export const Sidebar: React.FC = () => {
  const { progress } = useProgress();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: <FiHome className="w-4 h-4" /> },
    { label: 'Knowledge Graph', path: '/mindmap', icon: <FiGrid className="w-4 h-4" /> },
    { label: 'Career Roadmaps', path: '/roadmaps', icon: <FiMap className="w-4 h-4" /> },
    { label: 'Course Library', path: '/courses', icon: <FiBookOpen className="w-4 h-4" /> },
    { label: 'Tech Ecosystem', path: '/technologies', icon: <FiLayers className="w-4 h-4" /> },
    { 
      label: 'Progress & Mastery', 
      path: '/progress', 
      icon: <FiTrendingUp className="w-4 h-4" />,
      badge: `Lvl ${progress.level}`
    },
    { 
      label: 'Saved Bookmarks', 
      path: '/bookmarks', 
      icon: <FiBookmark className="w-4 h-4" />,
      badge: progress.bookmarkedTopics.length + progress.bookmarkedLessons.length || undefined
    },
    { label: 'System Settings', path: '/settings', icon: <FiSettings className="w-4 h-4" /> },
    { label: 'About DevMind', path: '/about', icon: <FiInfo className="w-4 h-4" /> }
  ];

  return (
    <aside className="w-60 h-[calc(100vh-4rem-2.5rem)] sticky top-16 theme-bg-card border-r theme-border p-3.5 flex flex-col justify-between hidden lg:flex select-none transition-colors duration-200 overflow-y-auto">
      <div className="space-y-4">
        {/* Main Navigation */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-bold theme-text-muted uppercase tracking-wider">
            Navigation
          </div>
          {navItems.slice(0, 5).map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'theme-text-muted hover:theme-text-heading hover:theme-bg-subtle'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/20 text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Personalization Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-bold theme-text-muted uppercase tracking-wider">
            Workspace
          </div>
          {navItems.slice(5).map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : 'theme-text-muted hover:theme-text-heading hover:theme-bg-subtle'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold theme-bg-subtle theme-text-muted border theme-border">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Mini Streak / Level Card in Sidebar */}
      <div className="p-3 rounded-xl theme-bg-subtle border theme-border">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-semibold theme-text-heading text-[11px]">Level {progress.level} Developer</span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-[11px]">{progress.xp} XP</span>
        </div>
        <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1 overflow-hidden mb-1.5">
          <div
            className="bg-indigo-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${(progress.xp % 200) / 2}%` }}
          />
        </div>
        <p className="text-[10px] theme-text-muted leading-tight">
          {200 - (progress.xp % 200)} XP to next tier
        </p>
      </div>
    </aside>
  );
};
