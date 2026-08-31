import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className
}) => {
  return (
    <div className={clsx('flex items-center gap-1.5 p-1 theme-bg-card rounded-xl border theme-border overflow-x-auto no-scrollbar', className)}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'relative flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap select-none',
              isActive ? 'text-white' : 'theme-text-muted hover:theme-text-heading hover:theme-bg-subtle'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-indigo-600 rounded-lg shadow-sm"
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className={clsx('px-1.5 py-0.5 rounded-full text-[10px] font-mono', isActive ? 'bg-white/25 text-white' : 'theme-bg-subtle theme-text-muted')}>
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
