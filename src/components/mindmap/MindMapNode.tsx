import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiLock, FiClock, FiBookmark, FiBookOpen } from 'react-icons/fi';
import { MindMapTopic } from '../../types/mindmap';
import { getTopicIcon } from '../../utils/iconMap';
import { Badge } from '../ui/Badge';

export interface MindMapNodeData extends Record<string, unknown> {
  topic: MindMapTopic;
  isCompleted: boolean;
  isInProgress: boolean;
  isLocked: boolean;
  isBookmarked: boolean;
  onSelect: (topic: MindMapTopic) => void;
}

export type TopicCustomNode = Node<MindMapNodeData, 'topicNode'>;

export const MindMapNode = memo((props: NodeProps<TopicCustomNode>) => {
  const { data } = props;
  const { topic, isCompleted, isInProgress, isLocked, isBookmarked, onSelect } = data || {};

  if (!topic) return null;

  let borderClass = 'theme-border hover:border-indigo-500 theme-bg-card';
  let statusBadge = <Badge variant="default" size="sm">Available</Badge>;

  if (isCompleted) {
    borderClass = 'border-emerald-500 theme-bg-card shadow-sm';
    statusBadge = (
      <Badge variant="success" size="sm" icon={<FiCheckCircle className="w-3 h-3 text-emerald-500" />}>
        Completed ✓
      </Badge>
    );
  } else if (isInProgress) {
    borderClass = 'border-indigo-500 theme-bg-card shadow-sm';
    statusBadge = (
      <Badge variant="primary" size="sm" icon={<FiClock className="w-3 h-3 text-indigo-500" />}>
        Studying
      </Badge>
    );
  } else if (isLocked) {
    borderClass = 'theme-border opacity-60 theme-bg-subtle';
    statusBadge = (
      <Badge variant="locked" size="sm" icon={<FiLock className="w-3 h-3" />}>
        Locked
      </Badge>
    );
  }

  const levelColors: Record<string, string> = {
    beginner: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    intermediate: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    advanced: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
    professional: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20'
  };

  return (
    <div
      onClick={() => onSelect && onSelect(topic)}
      className="relative group cursor-pointer select-none"
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-slate-500 group-hover:!bg-indigo-500 !border-2 !border-white dark:!border-slate-900 transition-colors"
      />

      <motion.div
        whileHover={{ scale: isLocked ? 1 : 1.02, y: isLocked ? 0 : -2 }}
        transition={{ duration: 0.15 }}
        className={`w-64 p-4 rounded-xl border ${borderClass} shadow-sm transition-all`}
      >
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: `${topic.color}25`, border: `1px solid ${topic.color}60` }}
            >
              {getTopicIcon(topic.iconName, 'w-4 h-4')}
            </div>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${levelColors[topic.level]}`}>
              Level {topic.levelNumber}
            </span>
          </div>

          {isBookmarked && (
            <FiBookmark className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500 flex-shrink-0" />
          )}
        </div>

        <h4 className="text-sm font-bold theme-text-heading tracking-tight leading-snug line-clamp-1 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {topic.title}
        </h4>

        <p className="text-[11px] theme-text-muted line-clamp-2 leading-relaxed mb-3">
          {topic.description}
        </p>

        <div className="flex items-center justify-between text-[11px] pt-2 border-t theme-border">
          <div className="flex items-center gap-1 theme-text-muted font-mono">
            <FiBookOpen className="w-3 h-3 opacity-60" />
            <span>{topic.lessonsCount} lessons</span>
          </div>
          {statusBadge}
        </div>
      </motion.div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-slate-500 group-hover:!bg-indigo-500 !border-2 !border-white dark:!border-slate-900 transition-colors"
      />
    </div>
  );
});

MindMapNode.displayName = 'MindMapNode';
