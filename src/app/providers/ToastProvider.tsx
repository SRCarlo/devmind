import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiBookmark, FiX } from 'react-icons/fi';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info' | 'bookmark' | 'achievement';
  title: string;
  message?: string;
  duration?: number;
}

export type ToastParam = 
  | string 
  | { title: string; type?: ToastItem['type']; message?: string; duration?: number };

interface ToastContextType {
  showToast: (toastOrTitle: ToastParam, type?: ToastItem['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((toastOrTitle: ToastParam, type: ToastItem['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    let newToast: ToastItem;

    if (typeof toastOrTitle === 'string') {
      newToast = {
        id,
        title: toastOrTitle,
        type,
        duration: 3500
      };
    } else {
      newToast = {
        id,
        title: toastOrTitle.title,
        type: toastOrTitle.type || type,
        message: toastOrTitle.message,
        duration: toastOrTitle.duration || 3500
      };
    }

    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, newToast.duration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Notification Container */}
      <div className="fixed bottom-14 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none select-none">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl theme-bg-card border theme-border shadow-2xl"
            >
              <div className="flex-shrink-0 mt-0.5">
                {t.type === 'success' && <FiCheckCircle className="w-5 h-5 text-emerald-500" />}
                {t.type === 'error' && <FiAlertCircle className="w-5 h-5 text-rose-500" />}
                {t.type === 'info' && <FiInfo className="w-5 h-5 text-indigo-500" />}
                {t.type === 'bookmark' && <FiBookmark className="w-5 h-5 text-indigo-500" />}
                {t.type === 'achievement' && <span className="text-xl">🏆</span>}
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold theme-text-heading">{t.title}</h4>
                {t.message && <p className="text-[11px] theme-text-muted mt-0.5">{t.message}</p>}
              </div>

              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:theme-text-heading p-1"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
