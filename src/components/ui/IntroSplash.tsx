import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from './BrandLogo';
import { 
  FaReact, 
  FaPython, 
  FaJava, 
  FaDocker, 
  FaGitAlt 
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiJavascript, 
  SiPostgresql, 
  SiSpringboot, 
  SiRust, 
  SiGo, 
  SiHtml5, 
  SiCss 
} from 'react-icons/si';
import { FiArrowRight, FiCheck, FiCpu, FiTerminal, FiAward } from 'react-icons/fi';

// 4 Career Evolution Stages
const EVOLUTION_STAGES = [
  {
    tier: 'Stage 1',
    level: 'Beginner Foundations',
    badge: '🌱 Absolute Beginner',
    range: [0, 25],
    color: '#38BDF8',
    techs: ['HTML5', 'CSS3', 'JS Basics', 'Git'],
    desc: 'Connecting foundational web nodes: Document Object Model, Lexical Scope, and Styling Engines...'
  },
  {
    tier: 'Stage 2',
    level: 'Intermediate Developer',
    badge: '⚡ Fullstack Engineer',
    range: [25, 50],
    color: '#818CF8',
    techs: ['React 19', 'TypeScript', 'Python 3.12', 'REST APIs'],
    desc: 'Wiring component trees, static type systems, list comprehensions, and reactive data flow...'
  },
  {
    tier: 'Stage 3',
    level: 'Advanced Engineer',
    badge: '🏛️ Systems & Cloud Specialist',
    range: [50, 75],
    color: '#C084FC',
    techs: ['Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'Go'],
    desc: 'Synthesizing enterprise architectures, relational joins, containers, and backend microservices...'
  },
  {
    tier: 'Stage 4',
    level: 'Master & Architect',
    badge: '🚀 Principal Software Architect',
    range: [75, 100],
    color: '#34D399',
    techs: ['System Design', 'Clean Architecture', 'Rust', 'Kubernetes'],
    desc: 'Full Neural Knowledge Graph connected! Quantum AST compile complete. Ready to build world-class software.'
  }
];

// Connected Neural Nodes with explicit coordinates in a 400x240 SVG viewbox
const NODES = [
  // Stage 1 nodes (Left cluster)
  { id: 'n1', x: 50, y: 70, label: 'HTML5', icon: <SiHtml5 className="w-3.5 h-3.5 text-orange-500" />, stage: 1 },
  { id: 'n2', x: 50, y: 170, label: 'CSS3', icon: <SiCss className="w-3.5 h-3.5 text-blue-500" />, stage: 1 },
  { id: 'n3', x: 110, y: 120, label: 'JS Core', icon: <SiJavascript className="w-3.5 h-3.5 text-yellow-400" />, stage: 1 },

  // Stage 2 nodes (Mid-left cluster)
  { id: 'n4', x: 170, y: 60, label: 'React 19', icon: <FaReact className="w-3.5 h-3.5 text-cyan-400" />, stage: 2 },
  { id: 'n5', x: 170, y: 180, label: 'TypeScript', icon: <SiTypescript className="w-3.5 h-3.5 text-blue-400" />, stage: 2 },
  { id: 'n6', x: 200, y: 120, label: 'Python', icon: <FaPython className="w-3.5 h-3.5 text-amber-400" />, stage: 2 },

  // Stage 3 nodes (Mid-right cluster)
  { id: 'n7', x: 260, y: 60, label: 'Java 21', icon: <FaJava className="w-3.5 h-3.5 text-orange-400" />, stage: 3 },
  { id: 'n8', x: 260, y: 180, label: 'PostgreSQL', icon: <SiPostgresql className="w-3.5 h-3.5 text-sky-400" />, stage: 3 },
  { id: 'n9', x: 290, y: 120, label: 'Spring Boot', icon: <SiSpringboot className="w-3.5 h-3.5 text-emerald-400" />, stage: 3 },

  // Stage 4 nodes (Right cluster & Master center)
  { id: 'n10', x: 350, y: 70, label: 'Docker', icon: <FaDocker className="w-3.5 h-3.5 text-cyan-500" />, stage: 4 },
  { id: 'n11', x: 350, y: 170, label: 'Rust', icon: <SiRust className="w-3.5 h-3.5 text-orange-500" />, stage: 4 }
];

// Connecting Neural Synapse Lines between nodes
const CONNECTIONS = [
  { from: 'n1', to: 'n3', stage: 1 },
  { from: 'n2', to: 'n3', stage: 1 },
  { from: 'n3', to: 'n4', stage: 2 },
  { from: 'n3', to: 'n5', stage: 2 },
  { from: 'n3', to: 'n6', stage: 2 },
  { from: 'n4', to: 'n7', stage: 3 },
  { from: 'n5', to: 'n8', stage: 3 },
  { from: 'n6', to: 'n9', stage: 3 },
  { from: 'n7', to: 'n10', stage: 4 },
  { from: 'n8', to: 'n11', stage: 4 },
  { from: 'n9', to: 'n10', stage: 4 },
  { from: 'n9', to: 'n11', stage: 4 }
];

const INSPIRATIONAL_QUOTES = [
  { quote: '“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”', author: 'Martin Fowler' },
  { quote: '“Talk is cheap. Show me the code.”', author: 'Linus Torvalds' },
  { quote: '“Experience is the name everyone gives to their mistakes.”', author: 'Oscar Wilde' },
  { quote: '“Simplicity is prerequisite for reliability.”', author: 'Edsger W. Dijkstra' },
  { quote: '“The function of good software is to make the complex appear simple.”', author: 'Grady Booch' }
];

export const IntroSplash: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(() => {
    const hasSeen = sessionStorage.getItem('devmind_has_seen_splash');
    return !hasSeen;
  });

  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    // 25-Second Journey
    const totalDurationMs = 25000;
    const intervalMs = 50;
    const stepIncrement = 100 / (totalDurationMs / intervalMs);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const next = prev + stepIncrement;
        if (next >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    const countdownTimer = setInterval(() => {
      setTimeLeft(prev => (prev > 1 ? prev - 1 : 0));
    }, 1000);

    const quoteTimer = setInterval(() => {
      setQuoteIdx(prev => (prev + 1) % INSPIRATIONAL_QUOTES.length);
    }, 5000);

    const completeTimer = setTimeout(() => {
      handleDismiss();
    }, 25200);

    return () => {
      clearInterval(progressTimer);
      clearInterval(countdownTimer);
      clearInterval(quoteTimer);
      clearTimeout(completeTimer);
    };
  }, [isVisible]);

  const handleDismiss = () => {
    sessionStorage.setItem('devmind_has_seen_splash', 'true');
    setIsVisible(false);
    if (onComplete) onComplete();
  };

  if (!isVisible) return null;

  // Determine active stage based on progress (0-25, 25-50, 50-75, 75-100)
  const currentStageIdx = progress < 25 ? 0 : progress < 50 ? 1 : progress < 75 ? 2 : 3;
  const currentStage = EVOLUTION_STAGES[currentStageIdx];
  const activeStageNum = currentStageIdx + 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: 'blur(16px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-slate-950 text-white select-none overflow-y-auto p-4 sm:p-6"
      >
        {/* Background Ambient Stars & Synapse Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_30%,rgba(99,102,241,0.22),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative z-10 w-full max-w-4xl flex items-center justify-between py-2 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-slate-300 font-bold uppercase tracking-wider">
              Developer Evolution Synapse Matrix
            </span>
          </div>

          <button
            onClick={handleDismiss}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-indigo-300 hover:text-white hover:border-indigo-500 transition-all shadow-lg text-xs font-semibold cursor-pointer"
          >
            <span>Skip to Workspace</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Central Connected Synapse Graph & Evolution Journey */}
        <div className="relative z-10 flex flex-col items-center max-w-3xl w-full text-center space-y-6 my-auto py-2">
          {/* Evolution Stage Indicator Ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {EVOLUTION_STAGES.map((stg, idx) => {
              const isPassed = progress >= (idx + 1) * 25;
              const isCurrent = currentStageIdx === idx;

              return (
                <div
                  key={stg.tier}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isCurrent
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-105'
                      : isPassed
                      ? 'bg-slate-900 border-emerald-500/50 text-emerald-400'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500'
                  }`}
                >
                  <span>{stg.badge}</span>
                  {isPassed && <FiCheck className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
              );
            })}
          </div>

          {/* Connected Neural Dots & Laser Lines Visualizer (SVG Matrix) */}
          <div className="relative w-full max-w-2xl h-56 sm:h-64 bg-slate-900/80 border border-slate-800 rounded-3xl p-2 shadow-2xl overflow-hidden backdrop-blur-md">
            {/* SVG Connecting Lines Canvas */}
            <svg viewBox="0 0 400 240" className="w-full h-full">
              {/* Grid Background Lines in SVG */}
              <defs>
                <linearGradient id="laser-grad-active" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id="laser-grad-inactive" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#1E293B" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Draw Synapse Connection Lines */}
              {CONNECTIONS.map((conn, idx) => {
                const nodeFrom = NODES.find(n => n.id === conn.from)!;
                const nodeTo = NODES.find(n => n.id === conn.to)!;
                const isLineActive = activeStageNum >= conn.stage;

                return (
                  <g key={idx}>
                    <line
                      x1={nodeFrom.x}
                      y1={nodeFrom.y}
                      x2={nodeTo.x}
                      y2={nodeTo.y}
                      stroke={isLineActive ? 'url(#laser-grad-active)' : 'url(#laser-grad-inactive)'}
                      strokeWidth={isLineActive ? 2.5 : 1}
                      strokeDasharray={isLineActive ? 'none' : '4 4'}
                    />
                    {isLineActive && (
                      <circle
                        r={2.5}
                        fill="#38BDF8"
                        className="animate-ping"
                        cx={(nodeFrom.x + nodeTo.x) / 2}
                        cy={(nodeFrom.y + nodeTo.y) / 2}
                      />
                    )}
                  </g>
                );
              })}

              {/* Draw Neural Node Dots with glowing energy */}
              {NODES.map(node => {
                const isNodeActive = activeStageNum >= node.stage;

                return (
                  <g key={node.id} className="cursor-pointer">
                    {/* Outer Glow Halo for Active Nodes */}
                    {isNodeActive && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={18}
                        fill="#6366F1"
                        fillOpacity={0.2}
                        className="animate-pulse"
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={12}
                      fill={isNodeActive ? '#0F172A' : '#1E293B'}
                      stroke={isNodeActive ? '#818CF8' : '#475569'}
                      strokeWidth={isNodeActive ? 2 : 1}
                    />

                    {/* Node Text Label */}
                    <text
                      x={node.x}
                      y={node.y + 22}
                      textAnchor="middle"
                      fill={isNodeActive ? '#E2E8F0' : '#64748B'}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight={isNodeActive ? 'bold' : 'normal'}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Stage Tag Overlay */}
            <div className="absolute top-3 left-4 flex items-center gap-2 font-mono text-[10px] text-cyan-400 bg-black/60 px-2.5 py-1 rounded-full border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>Synapse Level: {currentStage.level}</span>
            </div>

            <div className="absolute top-3 right-4 font-mono text-xs font-bold text-amber-400">
              ⏱️ {timeLeft}s remaining
            </div>
          </div>

          {/* Current Evolution Stage Explanation Card */}
          <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 text-left shadow-2xl space-y-3 font-mono text-xs backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <FiCpu className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                  {currentStage.badge} — Evolution Status
                </span>
              </div>
              <span className="text-cyan-400 font-bold text-sm font-mono">
                {Math.min(100, Math.round(progress))}% Completed
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {currentStage.desc}
            </p>

            {/* Active Connected Tech Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider mr-1">
                Connected Nodes:
              </span>
              {currentStage.techs.map(t => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                >
                  ✓ {t}
                </span>
              ))}
            </div>

            {/* Glowing 25-Second Journey Progress Bar */}
            <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-700/60 shadow-inner mt-2">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 shadow-[0_0_16px_#6366F1]"
                style={{ width: `${Math.min(100, progress)}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </div>

          {/* Inspirational Quotes Carousel */}
          <div className="min-h-[40px] flex flex-col items-center justify-center text-center px-4 max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
                className="space-y-1"
              >
                <p className="text-xs sm:text-sm font-medium text-slate-300 italic font-display">
                  {INSPIRATIONAL_QUOTES[quoteIdx].quote}
                </p>
                <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                  — {INSPIRATIONAL_QUOTES[quoteIdx].author}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Bar Info */}
        <div className="relative z-10 w-full max-w-4xl flex items-center justify-between py-2 text-[11px] font-mono text-slate-500">
          <span>DevMind Evolution Matrix © {new Date().getFullYear()}</span>
          <span className="hover:text-slate-300 transition-colors cursor-pointer" onClick={handleDismiss}>
            Click anywhere or press any key to launch workspace
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
