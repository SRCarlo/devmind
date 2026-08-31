import React from 'react';
import { 
  FiInfo, 
  FiCode, 
  FiShield, 
  FiZap, 
  FiBookOpen,
  FiGrid,
  FiCompass,
  FiTerminal
} from 'react-icons/fi';
import { BrandLogo } from '../components/ui/BrandLogo';

export const AboutPage: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 pb-20 transition-colors duration-200">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
          <FiInfo className="w-3.5 h-3.5" />
          <span>Platform Overview</span>
        </div>
        <div className="flex items-center gap-3">
          <BrandLogo size="md" />
          <h1 className="text-3xl font-extrabold theme-text-heading tracking-tight font-display">
            About DevMind
          </h1>
        </div>
        <p className="text-sm theme-text-muted leading-relaxed max-w-2xl">
          The visual brain for modern software developers. An interactive, client-side engineering knowledge graph designed to make mastering fullstack architecture intuitive and structured.
        </p>
      </div>

      {/* Main Mission Card */}
      <div className="p-6 sm:p-8 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-6">
        <div className="space-y-3">
          <h2 className="text-xl font-bold theme-text-heading tracking-tight">Our Core Engineering Philosophy</h2>
          <p className="text-sm theme-text-main leading-relaxed">
            DevMind bridges the gap between passive video tutorials and fragmented documentation. By structuring knowledge into an interactive visual synapse graph, engineers can visualize not just isolated syntax, but how all systems—from DNS and networking to React 19, Python 3.12, Java 21, and Cloud Microservices—connect together.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl theme-bg-subtle border theme-border space-y-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 w-fit">
              <FiGrid className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold theme-text-heading">Interactive Knowledge Graph</h3>
            <p className="text-xs theme-text-muted leading-relaxed">
              Explore interconnected concept nodes with explicit dependency prerequisites and level progression paths.
            </p>
          </div>

          <div className="p-5 rounded-2xl theme-bg-subtle border theme-border space-y-2.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 w-fit">
              <FiTerminal className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold theme-text-heading">In-Browser Code Sandboxes</h3>
            <p className="text-xs theme-text-muted leading-relaxed">
              Execute JavaScript and verify console output in real-time with zero installation or backend latency.
            </p>
          </div>

          <div className="p-5 rounded-2xl theme-bg-subtle border theme-border space-y-2.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 w-fit">
              <FiShield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold theme-text-heading">Privacy & 100% Local Storage</h3>
            <p className="text-xs theme-text-muted leading-relaxed">
              Your study notes, progress XP, streak dates, and bookmarks stay private on your device with JSON backup tools.
            </p>
          </div>

          <div className="p-5 rounded-2xl theme-bg-subtle border theme-border space-y-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 w-fit">
              <FiCompass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold theme-text-heading">Adaptive Experience Tiers</h3>
            <p className="text-xs theme-text-muted leading-relaxed">
              Dynamically adapts views for Beginners (Level 0-1), Standard Fullstack (All Levels), and Pro Architects (Level 2-4).
            </p>
          </div>
        </div>
      </div>

      {/* Learning Workflow Guide */}
      <div className="p-6 sm:p-8 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-4">
        <h3 className="text-base font-bold theme-text-heading">The DevMind Learning Workflow</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="p-4 rounded-2xl theme-bg-subtle border theme-border space-y-1.5">
            <div className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">1. VISUALIZE</div>
            <p className="theme-text-muted leading-relaxed">
              Explore the knowledge graph to discover prerequisites and build a mental model of how technologies interconnect.
            </p>
          </div>

          <div className="p-4 rounded-2xl theme-bg-subtle border theme-border space-y-1.5">
            <div className="font-bold text-cyan-600 dark:text-cyan-400 font-mono">2. BUILD</div>
            <p className="theme-text-muted leading-relaxed">
              Work through complete multi-module course syllabi and experiment directly in live code sandboxes.
            </p>
          </div>

          <div className="p-4 rounded-2xl theme-bg-subtle border theme-border space-y-1.5">
            <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">3. MASTER</div>
            <p className="theme-text-muted leading-relaxed">
              Test your knowledge with conceptual quizzes, review interview questions, and level up your developer tier.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
