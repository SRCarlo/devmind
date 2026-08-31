import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { CommandPalette } from '../search/CommandPalette';
import { AIAssistantDrawer } from '../ai/AIAssistantDrawer';
import { RouteProgressBar, FullScreenPageLoader } from '../ui/LoadingAnimations';

export const AppShell: React.FC = () => {
  const location = useLocation();
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiTopicContext, setAiTopicContext] = useState('Fullstack Engineering & Architecture');

  const handleOpenAI = (topicTitle?: string) => {
    if (topicTitle) setAiTopicContext(topicTitle);
    setIsAIOpen(true);
  };

  const isMindMapRoute = location.pathname === '/mindmap';

  return (
    <div className="min-h-screen theme-bg-page theme-text-main flex flex-col selection:bg-indigo-500/25 selection:text-indigo-600 transition-colors duration-200">
      {/* Route Navigation Loading Progress Bar & Full Screen Transition */}
      <RouteProgressBar />
      <FullScreenPageLoader />

      {/* Top Navigation Bar */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenAIAssistant={() => handleOpenAI()}
      />

      <div className="flex-1 flex">
        {/* Persistent Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic Route Content (Scrollable with bottom padding for fixed footer) */}
        <div className={`flex-1 flex flex-col min-w-0 ${
          isMindMapRoute
            ? 'h-[calc(100vh-4rem-2.5rem)] overflow-hidden'
            : 'h-[calc(100vh-4rem-2.5rem)] overflow-y-auto pb-6'
        }`}>
          <main className="flex-1">
            <Outlet context={{ onOpenAI: handleOpenAI }} />
          </main>
        </div>
      </div>

      {/* Sleek Fixed Footer Bar */}
      <Footer />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* AI Copilot Drawer */}
      <AIAssistantDrawer
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        initialTopicTitle={aiTopicContext}
      />
    </div>
  );
};
