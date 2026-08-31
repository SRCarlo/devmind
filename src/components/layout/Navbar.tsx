import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiMoon, 
  FiSun, 
  FiMonitor, 
  FiSliders, 
  FiCheck,
  FiMenu,
  FiX,
  FiHome,
  FiGrid,
  FiMap,
  FiBookOpen,
  FiLayers,
  FiTrendingUp,
  FiBookmark,
  FiSettings,
  FiInfo,
  FiArrowRight
} from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import { FaFire } from 'react-icons/fa';
import { useProgress } from '../../app/providers/ProgressProvider';
import { useTheme } from '../../app/providers/ThemeProvider';
import { useToast } from '../../app/providers/ToastProvider';
import { Button } from '../ui/Button';
import { BrandLogo } from '../ui/BrandLogo';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenAIAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, onOpenAIAssistant }) => {
  const { progress, setLearningMode } = useProgress();
  const { theme, setTheme, actualTheme } = useTheme();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [showModeMenu, setShowModeMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleModeSelect = (mode: 'beginner' | 'standard' | 'pro') => {
    setLearningMode(mode);
    setShowModeMenu(false);
    if (mode === 'beginner') {
      showToast('🌱 Beginner Tier: Filtered to Level 0-1 Core Fundamentals', 'info');
    } else if (mode === 'pro') {
      showToast('🏛️ Pro Architect: Filtered to Systems & Architecture Level 2-4', 'info');
    } else {
      showToast('⚡ Standard Tier: Showing Complete Knowledge Graph', 'info');
    }
  };

  const mainNavItems = [
    { label: 'Dashboard', path: '/', icon: <FiHome className="w-4 h-4" /> },
    { label: 'Knowledge Graph', path: '/mindmap', icon: <FiGrid className="w-4 h-4" /> },
    { label: 'Career Roadmaps', path: '/roadmaps', icon: <FiMap className="w-4 h-4" /> },
    { label: 'Course Library', path: '/courses', icon: <FiBookOpen className="w-4 h-4" /> },
    { label: 'Tech Ecosystem', path: '/technologies', icon: <FiLayers className="w-4 h-4" /> }
  ];

  const personalNavItems = [
    { label: 'Progress & Mastery', path: '/progress', icon: <FiTrendingUp className="w-4 h-4" />, badge: `Lvl ${progress.level}` },
    { label: 'Saved Bookmarks', path: '/bookmarks', icon: <FiBookmark className="w-4 h-4" />, badge: progress.bookmarkedTopics.length + progress.bookmarkedLessons.length || undefined },
    { label: 'Platform Settings', path: '/settings', icon: <FiSettings className="w-4 h-4" /> },
    { label: 'About Platform', path: '/about', icon: <FiInfo className="w-4 h-4" /> }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full h-16 theme-bg-nav backdrop-blur-md border-b theme-border px-3 sm:px-6 flex items-center justify-between gap-3 transition-colors duration-200">
        {/* Brand & Unique Logo */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group select-none">
            <BrandLogo size="md" />

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight font-display bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  DevMind
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] theme-text-muted font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block animate-pulse" />
                <span>Visualize. Build. Master.</span>
              </p>
            </div>
          </Link>

          {/* Global Search Button (Desktop) */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl theme-bg-subtle border theme-border theme-text-muted hover:theme-text-heading transition-all text-xs w-56 lg:w-64 shadow-sm"
          >
            <FiSearch className="w-3.5 h-3.5 opacity-70" />
            <span className="flex-1 text-left text-[11px]">Search topics, lessons...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px] font-mono theme-text-muted border theme-border">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side Stats & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search icon (Mobile & Tablet) */}
          <button
            onClick={onOpenCommandPalette}
            className="md:hidden p-2 rounded-xl theme-bg-subtle border theme-border theme-text-muted hover:theme-text-heading transition-colors"
            aria-label="Search"
          >
            <FiSearch className="w-4 h-4" />
          </button>

          {/* Gamification Stats: Streak & XP (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2 theme-bg-subtle border theme-border rounded-xl p-1.5 px-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500" title="Active Learning Streak">
              <FaFire className="w-3.5 h-3.5" />
              <span>{progress.streakDays}d</span>
            </div>
            <div className="w-px h-3.5 bg-black/10 dark:bg-white/10" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400" title="Experience Points">
              <span className="font-bold">⚡ {progress.xp} XP</span>
            </div>
            <div className="w-px h-3.5 bg-black/10 dark:bg-white/10" />
            <div className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
              Lvl {progress.level}
            </div>
          </div>

          {/* Learning Mode Selector Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => {
                setShowModeMenu(!showModeMenu);
                setShowThemeMenu(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl theme-bg-subtle border theme-border theme-text-heading hover:border-indigo-500/50 text-xs font-medium transition-colors"
            >
              <FiSliders className="w-3.5 h-3.5 text-indigo-500" />
              <span className="capitalize">{progress.mode}</span>
            </button>

            {showModeMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl theme-bg-card border theme-border shadow-xl p-1.5 z-50">
                <div className="px-3 py-2 text-[11px] font-semibold theme-text-muted uppercase tracking-wider border-b theme-border">
                  Experience Tier
                </div>
                <button
                  onClick={() => handleModeSelect('beginner')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                    progress.mode === 'beginner' ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold' : 'theme-text-main hover:theme-bg-subtle'
                  }`}
                >
                  <div>
                    <div className="text-left font-medium">🌱 Beginner Mode</div>
                    <div className="text-[10px] theme-text-muted text-left">Foundations & Level 0-1</div>
                  </div>
                  {progress.mode === 'beginner' && <FiCheck className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => handleModeSelect('standard')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                    progress.mode === 'standard' ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold' : 'theme-text-main hover:theme-bg-subtle'
                  }`}
                >
                  <div>
                    <div className="text-left font-medium">⚡ Standard Mode</div>
                    <div className="text-[10px] theme-text-muted text-left">Complete fullstack curriculum</div>
                  </div>
                  {progress.mode === 'standard' && <FiCheck className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => handleModeSelect('pro')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                    progress.mode === 'pro' ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold' : 'theme-text-main hover:theme-bg-subtle'
                  }`}
                >
                  <div>
                    <div className="text-left font-medium">🏛️ Pro Architect</div>
                    <div className="text-[10px] theme-text-muted text-left">Systems, Scale & Level 2-4</div>
                  </div>
                  {progress.mode === 'pro' && <FiCheck className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500/15 to-purple-500/15 hover:from-indigo-500/25 hover:to-purple-500/25 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-semibold text-xs transition-all shadow-sm group"
          >
            <LuSparkles className="w-3.5 h-3.5 text-indigo-500 group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">Copilot AI</span>
          </button>

          {/* Theme Selector Toggle */}
          <div className="relative">
            <button
              onClick={() => {
                setShowThemeMenu(!showThemeMenu);
                setShowModeMenu(false);
              }}
              className="p-2 rounded-xl theme-bg-subtle border theme-border theme-text-muted hover:theme-text-heading transition-colors"
              aria-label="Toggle Theme"
            >
              {actualTheme === 'dark' ? (
                <FiMoon className="w-4 h-4 text-indigo-400" />
              ) : (
                <FiSun className="w-4 h-4 text-amber-500" />
              )}
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl theme-bg-card border theme-border shadow-xl p-1 z-50">
                <button
                  onClick={() => {
                    setTheme('dark');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                    theme === 'dark' ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold' : 'theme-text-main hover:theme-bg-subtle'
                  }`}
                >
                  <FiMoon className="w-3.5 h-3.5" /> Dark
                </button>
                <button
                  onClick={() => {
                    setTheme('light');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                    theme === 'light' ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold' : 'theme-text-main hover:theme-bg-subtle'
                  }`}
                >
                  <FiSun className="w-3.5 h-3.5" /> Light
                </button>
                <button
                  onClick={() => {
                    setTheme('system');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                    theme === 'system' ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold' : 'theme-text-main hover:theme-bg-subtle'
                  }`}
                >
                  <FiMonitor className="w-3.5 h-3.5" /> System
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl theme-bg-subtle border theme-border theme-text-heading hover:border-indigo-500 transition-colors"
            aria-label="Open Navigation Menu"
          >
            {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Modern High-End Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Drawer Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 w-80 max-w-[88vw] h-full theme-bg-card border-r theme-border shadow-2xl z-[110] flex flex-col select-none overflow-hidden"
            >
              {/* Drawer Top Fixed Header */}
              <div className="p-4 border-b theme-border flex items-center justify-between theme-bg-nav flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <BrandLogo size="sm" />
                  <div>
                    <span className="font-extrabold text-base tracking-tight font-display theme-text-heading block leading-tight">
                      DevMind
                    </span>
                    <span className="text-[10px] theme-text-muted font-medium">Developer Platform</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl theme-bg-subtle border theme-border theme-text-muted hover:theme-text-heading transition-colors"
                  aria-label="Close Menu"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 pb-8">
                {/* Developer Stats Card */}
                <div className="p-3.5 rounded-2xl theme-bg-subtle border theme-border space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-500">
                      <FaFire className="w-3.5 h-3.5" />
                      <span>{progress.streakDays} Day Streak</span>
                    </div>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
                      ⚡ {progress.xp} XP
                    </span>
                  </div>

                  <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                      style={{ width: `${(progress.xp % 200) / 2}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] theme-text-muted">
                    <span>Level {progress.level} Developer</span>
                    <span>{200 - (progress.xp % 200)} XP to next tier</span>
                  </div>
                </div>

                {/* Main Navigation Section */}
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-bold theme-text-muted uppercase tracking-wider">
                    Study Hub
                  </div>
                  {mainNavItems.map(item => {
                    const isActive = location.pathname === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                            : 'theme-text-muted hover:theme-text-heading hover:theme-bg-subtle'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </button>
                    );
                  })}
                </div>

                {/* Workspace Navigation Section */}
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-bold theme-text-muted uppercase tracking-wider">
                    Personal Workspace
                  </div>
                  {personalNavItems.map(item => {
                    const isActive = location.pathname === item.path;
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavClick(item.path)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                            : 'theme-text-muted hover:theme-text-heading hover:theme-bg-subtle'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            isActive ? 'bg-white/20 text-white' : 'theme-bg-card theme-text-muted border theme-border'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Experience Tier Selector */}
                <div className="space-y-1.5">
                  <div className="px-2 text-[10px] font-bold theme-text-muted uppercase tracking-wider">
                    Experience Mode
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['beginner', 'standard', 'pro'] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => handleModeSelect(m)}
                        className={`py-2 px-1 rounded-xl text-[11px] font-bold capitalize transition-all border ${
                          progress.mode === m
                            ? 'bg-indigo-500/15 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm'
                            : 'theme-bg-subtle theme-border theme-text-muted hover:theme-text-heading'
                        }`}
                      >
                        {m === 'beginner' ? '🌱 Beg' : m === 'standard' ? '⚡ Std' : '🏛️ Pro'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Appearance Theme Selector */}
                <div className="space-y-1.5">
                  <div className="px-2 text-[10px] font-bold theme-text-muted uppercase tracking-wider">
                    Theme
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        theme === 'dark' ? 'bg-indigo-600 text-white border-indigo-500' : 'theme-bg-subtle theme-border theme-text-muted'
                      }`}
                    >
                      <FiMoon className="w-3.5 h-3.5" />
                      <span>Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        theme === 'light' ? 'bg-indigo-600 text-white border-indigo-500' : 'theme-bg-subtle theme-border theme-text-muted'
                      }`}
                    >
                      <FiSun className="w-3.5 h-3.5" />
                      <span>Light</span>
                    </button>
                    <button
                      onClick={() => setTheme('system')}
                      className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        theme === 'system' ? 'bg-indigo-600 text-white border-indigo-500' : 'theme-bg-subtle theme-border theme-text-muted'
                      }`}
                    >
                      <FiMonitor className="w-3.5 h-3.5" />
                      <span>Auto</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Fixed Bottom CTA */}
              <div className="p-4 border-t theme-border theme-bg-nav flex-shrink-0">
                <Button
                  size="md"
                  variant="primary"
                  className="w-full font-bold justify-center"
                  icon={<FiGrid />}
                  onClick={() => handleNavClick('/mindmap')}
                >
                  <span>Explore Knowledge Graph</span>
                  <FiArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
