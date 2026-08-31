import React from 'react';
import { FiGithub, FiHeart, FiExternalLink } from 'react-icons/fi';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-10 theme-bg-nav backdrop-blur-md border-t theme-border px-4 sm:px-6 flex items-center justify-between z-30 text-xs theme-text-muted transition-colors duration-200 select-none">
      {/* Creator Credit & GitHub Link */}
      <div className="flex items-center gap-1.5">
        <span>Created with</span>
        <FiHeart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
        <span>by</span>
        <a
          href="https://github.com/SRCarlo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:underline ml-0.5"
        >
          <FiGithub className="w-3.5 h-3.5" />
          <span>SRCarlo</span>
          <FiExternalLink className="w-2.5 h-2.5 opacity-60" />
        </a>
      </div>

      {/* Clean Copyright Mark */}
      <div className="text-[11px] font-medium">
        <span>© {new Date().getFullYear()} DevMind</span>
      </div>
    </footer>
  );
};
