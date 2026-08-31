import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX, FiCheck, FiRotateCcw, FiTrash2 } from 'react-icons/fi';
import { Button } from './Button';

interface DangerConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
}

export const DangerConfirmModal: React.FC<DangerConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Reset All Learning Progress?',
  description = 'This will erase all your completed modules, streak days, experience points (XP), bookmarks, and unlocked achievements from local storage. This action cannot be reversed.',
  confirmLabel = 'Wipe & Reset Everything'
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
        {/* Animated Cyber Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Animated Modal Dialog */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md theme-bg-card border border-rose-500/30 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(244,63,94,0.25)] z-10 overflow-hidden text-left"
        >
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl theme-bg-subtle border theme-border theme-text-muted hover:theme-text-heading hover:border-rose-500/40 transition-colors"
            aria-label="Close dialog"
          >
            <FiX className="w-4 h-4" />
          </button>

          {/* Glowing Animated Warning Icon */}
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute -inset-1.5 rounded-2xl bg-rose-500/40 blur-md"
              />
              <div className="relative w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <FiAlertTriangle className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-rose-500">
                Critical Danger Action
              </span>
              <h3 className="text-lg font-bold theme-text-heading leading-snug">
                {title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs theme-text-muted leading-relaxed mb-4">
            {description}
          </p>

          {/* Impact Checklist */}
          <div className="p-3.5 rounded-2xl theme-bg-subtle border theme-border space-y-2 mb-6 text-xs font-medium">
            <div className="text-[10px] font-bold theme-text-muted uppercase tracking-wider">
              Data Being Removed:
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-rose-500">✕</span>
                <span>All completed lessons & quizzes reset to 0</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-rose-500">✕</span>
                <span>Experience points & Level 1 reset</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-rose-500">✕</span>
                <span>Achievements & bookmarks cleared</span>
              </div>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5">
            <Button
              size="md"
              variant="ghost"
              className="w-full sm:w-auto text-xs"
              onClick={onClose}
            >
              Keep My Progress
            </Button>
            <Button
              size="md"
              variant="danger"
              icon={<FiTrash2 className="w-4 h-4" />}
              className="w-full sm:w-auto text-xs font-bold shadow-lg shadow-rose-500/20"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
