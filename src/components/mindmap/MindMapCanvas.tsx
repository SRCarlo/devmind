import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Node,
  Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { MINDMAP_TOPICS, MINDMAP_EDGES } from '../../data/mindmapData';
import { MindMapTopic, FilterState } from '../../types/mindmap';
import { MindMapNode } from './MindMapNode';
import { MindMapControls } from './MindMapControls';
import { NodeDetailsDrawer } from './NodeDetailsDrawer';
import { MindMapMobileTree } from './MindMapMobileTree';
import { useProgress } from '../../app/providers/ProgressProvider';
import { useTheme } from '../../app/providers/ThemeProvider';
import { FiGrid, FiList } from 'react-icons/fi';

const nodeTypes = {
  topicNode: MindMapNode
};

interface MindMapCanvasProps {
  onOpenAI: (topicTitle: string) => void;
}

export const MindMapCanvas: React.FC<MindMapCanvasProps> = ({ onOpenAI }) => {
  const { progress } = useProgress();
  const { actualTheme } = useTheme();
  const [selectedTopic, setSelectedTopic] = useState<MindMapTopic | null>(null);
  const [viewMode, setViewMode] = useState<'canvas' | 'list'>('canvas');

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    level: 'all',
    category: 'all',
    status: 'all',
    mode: progress.mode
  });

  // Sync mode filter when progress mode changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, mode: progress.mode }));
  }, [progress.mode]);

  const handleSelectTopic = useCallback((topic: MindMapTopic) => {
    setSelectedTopic(topic);
  }, []);

  // Filter topics
  const filteredTopics = useMemo(() => {
    return MINDMAP_TOPICS.filter(topic => {
      // Experience Tier progressive revelation
      if (filters.mode === 'beginner' && topic.levelNumber > 1) {
        return false;
      }
      if (filters.mode === 'pro' && topic.levelNumber < 2) {
        return false;
      }

      // Search query
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesTitle = topic.title.toLowerCase().includes(q);
        const matchesTags = topic.tags.some(t => t.toLowerCase().includes(q));
        const matchesCat = topic.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTags && !matchesCat) return false;
      }

      // Level filter
      if (filters.level !== 'all' && topic.level !== filters.level) {
        return false;
      }

      // Category filter
      if (filters.category !== 'all' && topic.category !== filters.category) {
        return false;
      }

      // Status filter
      const isCompleted = progress.completedTopics.includes(topic.id);
      const isInProgress = progress.inProgressTopics.includes(topic.id);
      const isBookmarked = progress.bookmarkedTopics.includes(topic.id);
      const isLocked = !isCompleted && !isInProgress && topic.prerequisites.some(p => !progress.completedTopics.includes(p));

      if (filters.status === 'completed' && !isCompleted) return false;
      if (filters.status === 'in-progress' && !isInProgress) return false;
      if (filters.status === 'locked' && !isLocked) return false;
      if (filters.status === 'bookmarked' && !isBookmarked) return false;

      return true;
    });
  }, [filters, progress]);

  // Construct React Flow Nodes
  const initialNodes: Node[] = useMemo(() => {
    return filteredTopics.map(topic => {
      const isCompleted = progress.completedTopics.includes(topic.id);
      const isInProgress = progress.inProgressTopics.includes(topic.id);
      const isBookmarked = progress.bookmarkedTopics.includes(topic.id);
      const isLocked = !isCompleted && !isInProgress && topic.prerequisites.some(p => !progress.completedTopics.includes(p));

      return {
        id: topic.id,
        type: 'topicNode',
        position: topic.position,
        data: {
          topic,
          isCompleted,
          isInProgress,
          isLocked,
          isBookmarked,
          onSelect: handleSelectTopic
        }
      };
    });
  }, [filteredTopics, progress, handleSelectTopic]);

  // Construct React Flow Edges with smoothstep clean lines
  const visibleTopicIds = useMemo(() => new Set(filteredTopics.map(t => t.id)), [filteredTopics]);

  const initialEdges: Edge[] = useMemo(() => {
    return MINDMAP_EDGES.filter(
      edge => visibleTopicIds.has(edge.source) && visibleTopicIds.has(edge.target)
    ).map(edge => {
      const sourceCompleted = progress.completedTopics.includes(edge.source);
      const targetCompleted = progress.completedTopics.includes(edge.target);
      const isCompletedConnection = sourceCompleted && targetCompleted;

      return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: 'smoothstep',
        animated: edge.animated || !isCompletedConnection,
        className: isCompletedConnection ? 'completed' : 'animated',
        style: {
          stroke: isCompletedConnection ? '#10B981' : '#6366F1',
          strokeWidth: isCompletedConnection ? 3 : 2
        }
      };
    });
  }, [visibleTopicIds, progress.completedTopics]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync state whenever filters/progress change
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      level: 'all',
      category: 'all',
      status: 'all',
      mode: progress.mode
    });
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem-2.5rem)] theme-bg-page flex flex-col transition-colors duration-200 overflow-hidden">
      {/* Top Dedicated Non-Overlapping Header Toolbar */}
      <div className="flex-shrink-0 theme-bg-nav border-b theme-border px-3 sm:px-5 py-2.5 z-20 space-y-2 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Track Legend */}
          <div className="hidden sm:flex items-center gap-3 text-[11px] theme-text-muted font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-500" /> Web & Frontend</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Core & Backend</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Architecture</span>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 theme-bg-subtle p-0.5 rounded-xl border theme-border ml-auto">
            <button
              onClick={() => setViewMode('canvas')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'canvas' ? 'bg-indigo-600 text-white shadow-sm' : 'theme-text-muted hover:theme-text-heading'
              }`}
            >
              <FiGrid className="w-3.5 h-3.5" />
              <span>Mind Map</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list' ? 'bg-indigo-600 text-white shadow-sm' : 'theme-text-muted hover:theme-text-heading'
              }`}
            >
              <FiList className="w-3.5 h-3.5" />
              <span>Tree View</span>
            </button>
          </div>
        </div>

        {/* Compact Filter Controls */}
        <MindMapControls
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalVisible={filteredTopics.length}
          totalAll={MINDMAP_TOPICS.length}
        />
      </div>

      {/* Main Graph Content Area - Zero collision */}
      {viewMode === 'canvas' ? (
        <div className="flex-1 w-full h-full relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            defaultViewport={{ x: 60, y: 50, zoom: 0.75 }}
            minZoom={0.2}
            maxZoom={1.5}
            fitViewOptions={{ padding: 0.2 }}
            attributionPosition="bottom-left"
            proOptions={{ hideAttribution: true }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={24}
              size={1}
              color={actualTheme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}
            />
            {/* Controls lifted up safely above bottom fixed footer */}
            <Controls className="!bottom-8 !left-4 !z-20 shadow-md" showInteractive={false} />
            <MiniMap
              className="!bottom-8 !right-4 !z-20 hidden md:block rounded-xl overflow-hidden border theme-border"
              nodeColor={node => {
                const data = node.data as { topic?: MindMapTopic };
                return data?.topic?.color || '#4F46E5';
              }}
              maskColor={actualTheme === 'dark' ? 'rgba(9, 13, 22, 0.85)' : 'rgba(248, 250, 252, 0.85)'}
              zoomable
              pannable
            />
          </ReactFlow>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-3xl mx-auto w-full pb-20">
          <MindMapMobileTree
            topics={filteredTopics}
            onSelectTopic={handleSelectTopic}
          />
        </div>
      )}

      {/* Selected Node Details Slide-in Drawer */}
      <NodeDetailsDrawer
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
        onOpenAI={onOpenAI}
      />
    </div>
  );
};
