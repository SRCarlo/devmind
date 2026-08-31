import React from 'react';
import { 
  FiSettings, 
  FiMoon, 
  FiSun, 
  FiMonitor, 
  FiSliders, 
  FiDownload, 
  FiRotateCcw,
  FiUser
} from 'react-icons/fi';
import { useProgress } from '../app/providers/ProgressProvider';
import { useTheme } from '../app/providers/ThemeProvider';
import { useToast } from '../app/providers/ToastProvider';
import { Button } from '../components/ui/Button';
import { DangerConfirmModal } from '../components/ui/DangerConfirmModal';

export const SettingsPage: React.FC = () => {
  const { progress, setLearningMode, resetProgress, exportProgressJSON } = useProgress();
  const { theme, setTheme } = useTheme();
  const { showToast } = useToast();
  const [showResetModal, setShowResetModal] = React.useState(false);

  const handleModeChange = (m: 'beginner' | 'standard' | 'pro') => {
    setLearningMode(m);
    if (m === 'beginner') {
      showToast('🌱 Beginner Tier: Filtered to Level 0-1 Foundations across all views', 'info');
    } else if (m === 'pro') {
      showToast('🏛️ Pro Architect: Filtered to Systems & Architecture Level 2-4', 'info');
    } else {
      showToast('⚡ Standard Tier: Showing Complete Knowledge Graph', 'info');
    }
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportProgressJSON());
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `devmind_backup_${Date.now()}.json`;
    a.click();
    showToast('💾 Progress backup exported successfully!', 'success');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8 pb-20 transition-colors duration-200">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
          <FiSettings className="w-3.5 h-3.5" />
          <span>Preferences & Data</span>
        </div>
        <h1 className="text-3xl font-extrabold theme-text-heading tracking-tight font-display">
          Platform Settings
        </h1>
        <p className="text-sm theme-text-muted">
          Customize your study experience, theme mode, and manage local storage data.
        </p>
      </div>

      {/* Theme Settings */}
      <div className="p-6 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-4">
        <h3 className="text-base font-bold theme-text-heading">Interface Appearance</h3>
        <p className="text-xs theme-text-muted">Select how DevMind appears on your display.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
              theme === 'dark'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : 'theme-bg-subtle theme-border theme-text-main hover:border-indigo-400'
            }`}
          >
            <FiMoon className="w-5 h-5" />
            <div>
              <div className="text-xs font-bold">Dark Study Mode</div>
              <div className="text-[10px] opacity-80">Calm low-light environment</div>
            </div>
          </button>

          <button
            onClick={() => setTheme('light')}
            className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
              theme === 'light'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : 'theme-bg-subtle theme-border theme-text-main hover:border-indigo-400'
            }`}
          >
            <FiSun className="w-5 h-5" />
            <div>
              <div className="text-xs font-bold">Light Paper Mode</div>
              <div className="text-[10px] opacity-80">Crisp daytime readability</div>
            </div>
          </button>

          <button
            onClick={() => setTheme('system')}
            className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all ${
              theme === 'system'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : 'theme-bg-subtle theme-border theme-text-main hover:border-indigo-400'
            }`}
          >
            <FiMonitor className="w-5 h-5" />
            <div>
              <div className="text-xs font-bold">System Default</div>
              <div className="text-[10px] opacity-80">Sync with OS appearance</div>
            </div>
          </button>
        </div>
      </div>

      {/* Learning Mode Experience */}
      <div className="p-6 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-4">
        <h3 className="text-base font-bold theme-text-heading">Learning Experience Tier</h3>
        <p className="text-xs theme-text-muted">Choose your current developer persona to adapt guidance levels.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={() => handleModeChange('beginner')}
            className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
              progress.mode === 'beginner'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : 'theme-bg-subtle theme-border theme-text-main hover:border-indigo-400'
            }`}
          >
            <div className="text-xs font-bold">🌱 Beginner Mode</div>
            <div className="text-[10px] opacity-80">Focus on Levels 0-1 fundamentals</div>
          </button>

          <button
            onClick={() => handleModeChange('standard')}
            className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
              progress.mode === 'standard'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : 'theme-bg-subtle theme-border theme-text-main hover:border-indigo-400'
            }`}
          >
            <div className="text-xs font-bold">⚡ Standard Mode</div>
            <div className="text-[10px] opacity-80">Complete balanced learning path</div>
          </button>

          <button
            onClick={() => handleModeChange('pro')}
            className={`p-4 rounded-2xl border text-left space-y-1 transition-all ${
              progress.mode === 'pro'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                : 'theme-bg-subtle theme-border theme-text-main hover:border-indigo-400'
            }`}
          >
            <div className="text-xs font-bold">🏛️ Pro Architect</div>
            <div className="text-[10px] opacity-80">Advanced system design & internals</div>
          </button>
        </div>
      </div>

      {/* Storage and Data Controls */}
      <div className="p-6 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-4">
        <h3 className="text-base font-bold theme-text-heading">Local Storage & Privacy</h3>
        <p className="text-xs theme-text-muted">
          Your progress, XP, completed lessons, notes, and streak dates remain strictly on this device in localStorage.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button size="sm" variant="outline" icon={<FiDownload />} onClick={handleExport}>
            Export Progress JSON
          </Button>

          <Button size="sm" variant="danger" icon={<FiRotateCcw />} onClick={() => setShowResetModal(true)}>
            Clear Local Data & Reset
          </Button>
        </div>
      </div>

      {/* Danger Confirm Modal */}
      <DangerConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={() => {
          resetProgress();
          showToast('🔄 Local data reset to newcomer state', 'info');
        }}
        title="Clear All Local Progress & Reset?"
        description="This will clear your local storage progress, completed topics, streaks, and XP points. Are you sure?"
        confirmLabel="Yes, Clear All Data"
      />
    </div>
  );
};
