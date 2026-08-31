import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { MindMapCanvas } from '../components/mindmap/MindMapCanvas';

interface OutletContextType {
  onOpenAI: (topicTitle: string) => void;
}

export const MindMapPage: React.FC = () => {
  const context = useOutletContext<OutletContextType>();
  const handleOpenAI = context?.onOpenAI || ((title: string) => console.log('AI:', title));

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <MindMapCanvas onOpenAI={handleOpenAI} />
    </div>
  );
};
