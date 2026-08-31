import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiZap, 
  FiCalendar, 
  FiDownload, 
  FiUpload, 
  FiRotateCcw,
  FiTrendingUp,
  FiCheckCircle,
  FiGrid,
  FiAward,
  FiLayers,
  FiFileText,
  FiArrowRight
} from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { useProgress } from '../app/providers/ProgressProvider';
import { useToast } from '../app/providers/ToastProvider';
import { ACHIEVEMENTS_DATA } from '../data/achievementsData';
import { MINDMAP_TOPICS } from '../data/mindmapData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CircularProgress } from '../components/ui/ProgressBar';
import { DangerConfirmModal } from '../components/ui/DangerConfirmModal';

const DOMAINS = [
  'Fundamentals',
  'HTML & CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Backend Awareness',
  'Architecture'
];

export const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    progress, 
    exportProgressJSON, 
    importProgressJSON, 
    resetProgress 
  } = useProgress();
  const { showToast } = useToast();

  const [importText, setImportText] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'domains' | 'achievements'>('overview');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalTopics = MINDMAP_TOPICS.length;
  const masteryPercentage = Math.round((progress.completedTopics.length / totalTopics) * 100);

  const handleDownloadBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportProgressJSON());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `devmind_progress_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('💾 Progress backup downloaded successfully!', 'success');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        if (importProgressJSON(content)) {
          showToast('✓ Progress restored successfully from backup file!', 'success');
        } else {
          showToast('❌ Invalid backup file format', 'error');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleImportSubmit = () => {
    if (!importText.trim()) {
      showToast('Please paste a valid JSON backup string', 'error');
      return;
    }

    if (importProgressJSON(importText)) {
      setShowImportModal(false);
      setImportText('');
      showToast('✓ Progress restored successfully!', 'success');
    } else {
      showToast('❌ Failed to parse backup data. Please check JSON syntax.', 'error');
    }
  };

  const handleResetExecute = () => {
    resetProgress();
    showToast('🔄 Progress data has been reset to newcomer state', 'info');
  };

  // 28-day activity calendar
  const days = Array.from({ length: 28 }, (_, i) => {
    const d = new Date(Date.now() - (27 - i) * 86400000);
    const dateStr = d.toISOString().split('T')[0];
    const hasActivity = progress.streakHistory.includes(dateStr);
    return {
      date: dateStr,
      hasActivity,
      dayNumber: d.getDate()
    };
  });

  return (
    <div className="p-3.5 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-24 transition-colors duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
              <FiTrendingUp className="w-3.5 h-3.5" />
              <span>Mastery & Achievements</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-bold">
              <span>Persona: Level {progress.level} Developer</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold theme-text-heading tracking-tight font-display">
            Learning Progress & Metrics
          </h1>
          <p className="text-xs sm:text-sm theme-text-muted max-w-2xl">
            Track your study streaks, skill domain coverage, developer achievements, and manage data backups.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={<FiDownload />}
            onClick={handleDownloadBackup}
          >
            Export Backup
          </Button>
          <Button
            size="sm"
            variant="primary"
            icon={<FiGrid />}
            onClick={() => navigate('/mindmap')}
          >
            Open Map
          </Button>
        </div>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Level & XP Card */}
        <div className="p-5 sm:p-6 rounded-3xl theme-bg-card border theme-border shadow-sm flex items-center gap-4 sm:gap-5">
          <CircularProgress value={(progress.xp % 200) / 2} size={76} strokeWidth={7} color="#4F46E5">
            <span className="text-lg font-bold font-mono theme-text-heading">L{progress.level}</span>
          </CircularProgress>
          <div className="min-w-0">
            <div className="text-xs font-semibold theme-text-muted">Developer Tier</div>
            <div className="text-xl sm:text-2xl font-extrabold theme-text-heading font-mono">{progress.xp} XP</div>
            <div className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-0.5 truncate">
              {200 - (progress.xp % 200)} XP to Lvl {progress.level + 1}
            </div>
          </div>
        </div>

        {/* Streak Tracker Card */}
        <div className="p-5 sm:p-6 rounded-3xl theme-bg-card border theme-border shadow-sm flex items-center gap-4 sm:gap-5">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex-shrink-0">
            <FaFire className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold theme-text-muted">Active Daily Streak</div>
            <div className="text-xl sm:text-2xl font-extrabold theme-text-heading font-mono">{progress.streakDays} Days</div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">Real-time daily tracker</div>
          </div>
        </div>

        {/* Topic Mastery Card */}
        <div className="p-5 sm:p-6 rounded-3xl theme-bg-card border theme-border shadow-sm flex items-center gap-4 sm:gap-5 sm:col-span-2 md:col-span-1">
          <CircularProgress value={masteryPercentage} size={76} strokeWidth={7} color="#10B981">
            <span className="text-base sm:text-lg font-bold font-mono theme-text-heading">{masteryPercentage}%</span>
          </CircularProgress>
          <div className="min-w-0">
            <div className="text-xs font-semibold theme-text-muted">Overall Syllabus Mastery</div>
            <div className="text-xl sm:text-2xl font-extrabold theme-text-heading font-mono">
              {progress.completedTopics.length} / {totalTopics}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Topics mastered</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b theme-border pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'theme-text-muted hover:theme-text-heading hover:theme-bg-subtle'
          }`}
        >
          Activity & Milestones
        </button>
        <button
          onClick={() => setActiveTab('domains')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'domains'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'theme-text-muted hover:theme-text-heading hover:theme-bg-subtle'
          }`}
        >
          Domain Breakdown
        </button>
        <button
          onClick={() => setActiveTab('achievements')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'achievements'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'theme-text-muted hover:theme-text-heading hover:theme-bg-subtle'
          }`}
        >
          Achievements ({progress.achievements.length}/{ACHIEVEMENTS_DATA.length})
        </button>
      </div>

      {/* Tab 1: Overview & Activity Heatmap */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 28-Day Streak Calendar Visualizer */}
          <div className="p-5 sm:p-8 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500" />
                <h3 className="text-sm sm:text-base font-bold theme-text-heading tracking-tight">
                  28-Day Study Activity Heatmap
                </h3>
              </div>
              <span className="text-[11px] theme-text-muted font-mono">Live Streak Log</span>
            </div>

            <div className="overflow-x-auto pb-2 -mx-2 px-2">
              <div className="grid grid-cols-14 sm:grid-cols-28 gap-1.5 min-w-[340px] pt-1">
                {days.map((day, idx) => (
                  <div
                    key={idx}
                    title={`${day.date}: ${day.hasActivity ? 'Active Study Day' : 'No activity recorded'}`}
                    className={`aspect-square rounded-lg sm:rounded-xl flex items-center justify-center text-[10px] font-mono font-semibold transition-transform hover:scale-110 ${
                      day.hasActivity
                        ? 'bg-emerald-500 text-white shadow-sm ring-1 ring-emerald-400'
                        : 'theme-bg-subtle border theme-border theme-text-muted opacity-40'
                    }`}
                  >
                    {day.dayNumber}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] theme-text-muted pt-2 border-t theme-border">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-md bg-emerald-500 inline-block" />
                <span>Active Study Date</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-md theme-bg-subtle border theme-border inline-block" />
                <span>Inactive</span>
              </div>
            </div>
          </div>

          {/* Level Progression Ladder */}
          <div className="p-5 sm:p-8 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-4">
            <h3 className="text-sm sm:text-base font-bold theme-text-heading">
              Developer Tier Progression
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              {[
                { lvl: 1, name: 'Junior Developer', minXp: 0, icon: '🌱' },
                { lvl: 2, name: 'Mid-Level Engineer', minXp: 200, icon: '⚡' },
                { lvl: 3, name: 'Senior Fullstack', minXp: 400, icon: '🏛️' },
                { lvl: 4, name: 'Principal Architect', minXp: 600, icon: '🚀' }
              ].map(tier => {
                const isCurrent = progress.level === tier.lvl;
                const isPassed = progress.xp >= tier.minXp;

                return (
                  <div
                    key={tier.lvl}
                    className={`p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'bg-indigo-500/15 border-indigo-500 shadow-sm'
                        : isPassed
                        ? 'theme-bg-subtle border-emerald-500/30'
                        : 'theme-bg-subtle theme-border opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lg">{tier.icon}</span>
                      <span className="text-[10px] font-mono font-bold theme-text-muted">
                        Level {tier.lvl}
                      </span>
                    </div>
                    <div className="text-xs font-bold theme-text-heading">{tier.name}</div>
                    <div className="text-[10px] theme-text-muted mt-0.5">{tier.minXp}+ XP Required</div>
                    {isCurrent && (
                      <span className="inline-block mt-2 px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-600 text-white">
                        Current Tier
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Domain Mastery Breakdown */}
      {activeTab === 'domains' && (
        <div className="p-5 sm:p-8 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold theme-text-heading">
              Curriculum Domain Breakdown
            </h3>
            <span className="text-xs theme-text-muted font-mono">
              {progress.completedTopics.length} / {totalTopics} Mastered
            </span>
          </div>

          <div className="space-y-4">
            {DOMAINS.map(domain => {
              const domainTopics = MINDMAP_TOPICS.filter(t => t.category === domain);
              const completedCount = domainTopics.filter(t => progress.completedTopics.includes(t.id)).length;
              const percent = domainTopics.length > 0 ? Math.round((completedCount / domainTopics.length) * 100) : 0;

              return (
                <div key={domain} className="p-4 rounded-2xl theme-bg-subtle border theme-border space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold theme-text-heading">{domain}</span>
                    <span className="font-mono theme-text-muted">
                      {completedCount}/{domainTopics.length} ({percent}%)
                    </span>
                  </div>

                  <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Achievements Showcase */}
      {activeTab === 'achievements' && (
        <div className="p-5 sm:p-8 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏆</span>
              <h3 className="text-sm sm:text-base font-bold theme-text-heading tracking-tight">
                Engineering Achievements
              </h3>
            </div>
            <Badge variant="primary" size="sm">
              {progress.achievements.length} / {ACHIEVEMENTS_DATA.length} Unlocked
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {ACHIEVEMENTS_DATA.map(ach => {
              const isUnlocked = progress.achievements.includes(ach.id);
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isUnlocked
                      ? 'theme-bg-card border-indigo-500/40 shadow-sm'
                      : 'theme-bg-subtle theme-border opacity-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{ach.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h4 className="text-xs font-bold theme-text-heading truncate">{ach.title}</h4>
                        <span className="text-[10px] font-mono font-bold text-amber-500 whitespace-nowrap">
                          +{ach.xpReward} XP
                        </span>
                      </div>
                      <p className="text-[11px] theme-text-muted line-clamp-2 leading-relaxed">
                        {ach.description}
                      </p>
                      {isUnlocked && (
                        <div className="mt-2 text-[10px] font-semibold text-emerald-500 flex items-center gap-1">
                          <span>✓ Unlocked</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Backup & Local Data Management Console */}
      <div className="p-5 sm:p-8 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-4">
        <h3 className="text-sm sm:text-base font-bold theme-text-heading">
          Data Management & Local Persistence
        </h3>
        <p className="text-xs theme-text-muted">
          Your progress is stored safely in your browser. You can export a JSON backup file, upload a file to restore, or reset progress anytime.
        </p>

        {/* Hidden File Input for Direct JSON Upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".json"
          className="hidden"
        />

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            size="sm"
            variant="outline"
            icon={<FiDownload />}
            onClick={handleDownloadBackup}
          >
            Export JSON Backup
          </Button>

          <Button
            size="sm"
            variant="outline"
            icon={<FiUpload />}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Backup File
          </Button>

          <Button
            size="sm"
            variant="ghost"
            icon={<FiFileText />}
            onClick={() => setShowImportModal(true)}
          >
            Paste JSON Text
          </Button>

          <Button
            size="sm"
            variant="danger"
            icon={<FiRotateCcw />}
            onClick={() => setShowResetModal(true)}
          >
            Reset Progress
          </Button>
        </div>
      </div>

      {/* Animated Danger Confirmation Modal */}
      <DangerConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={handleResetExecute}
        title="Reset All Learning Progress?"
        description="This will erase all your completed modules, daily streaks, experience points (XP), bookmarks, and unlocked achievements from this device. Are you sure?"
        confirmLabel="Yes, Wipe & Reset Everything"
      />

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg theme-bg-card border theme-border rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold theme-text-heading">Import Progress Backup</h3>
            <p className="text-xs theme-text-muted">
              Paste your exported DevMind JSON backup string below:
            </p>
            <textarea
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder='{"completedTopics": [...], "xp": 450, ...}'
              className="w-full h-36 font-mono text-xs theme-bg-input border theme-border rounded-xl p-3 theme-text-heading focus:outline-none focus:border-indigo-500"
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button size="sm" variant="ghost" onClick={() => setShowImportModal(false)}>
                Cancel
              </Button>
              <Button size="sm" variant="primary" onClick={handleImportSubmit}>
                Restore Data
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
