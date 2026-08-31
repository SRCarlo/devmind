import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiLock, FiClock, FiChevronRight, FiBookmark } from 'react-icons/fi';
import { MindMapTopic } from '../../types/mindmap';
import { getTopicIcon } from '../../utils/iconMap';
import { useProgress } from '../../app/providers/ProgressProvider';
import { Badge } from '../ui/Badge';

interface MindMapMobileTreeProps {
  topics: MindMapTopic[];
  onSelectTopic: (topic: MindMapTopic) => void;
}

export const MindMapMobileTree: React.FC<MindMapMobileTreeProps> = ({
  topics,
  onSelectTopic
}) => {
  const { progress } = useProgress();

  // Group topics by level
  const levels = [
    { levelNum: 0, label: 'Level 0 — Foundations & Web Basics' },
    { levelNum: 1, label: 'Level 1 — Core Programming Languages' },
    { levelNum: 2, label: 'Level 2 — Intermediate Frameworks & APIs' },
    { levelNum: 3, label: 'Level 3 — Advanced Frontend & Types' },
    { levelNum: 4, label: 'Level 4 — Systems, SQL & Architecture' }
  ];

  return (
    <div className="space-y-6 select-none transition-colors duration-200">
      {levels.map(lvl => {
        const lvlTopics = topics.filter(t => t.levelNumber === lvl.levelNum);
        if (lvlTopics.length === 0) return null;

        return (
          <div key={lvl.levelNum} className="space-y-3">
            <div className="flex items-center gap-2 px-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider theme-text-muted">
                {lvl.label}
              </h3>
            </div>

            <div className="space-y-2.5">
              {lvlTopics.map((topic, idx) => {
                const isCompleted = progress.completedTopics.includes(topic.id);
                const isInProgress = progress.inProgressTopics.includes(topic.id);
                const isBookmarked = progress.bookmarkedTopics.includes(topic.id);
                const isLocked = !isCompleted && !isInProgress && topic.prerequisites.some(p => !progress.completedTopics.includes(p));

                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => onSelectTopic(topic)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isCompleted
                        ? 'theme-bg-card border-emerald-500 shadow-sm'
                        : isInProgress
                        ? 'theme-bg-card border-indigo-500 shadow-sm'
                        : isLocked
                        ? 'theme-bg-subtle theme-border opacity-60'
                        : 'theme-bg-card theme-border hover:border-indigo-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                          style={{ backgroundColor: `${topic.color}25`, border: `1px solid ${topic.color}60` }}
                        >
                          {getTopicIcon(topic.iconName, 'w-5 h-5')}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <Badge variant="primary" size="sm">Level {topic.levelNumber}</Badge>
                            <span className="text-[11px] theme-text-muted truncate">{topic.category}</span>
                            {isBookmarked && (
                              <FiBookmark className="w-3 h-3 text-indigo-500 fill-indigo-500" />
                            )}
                          </div>
                          <h4 className="text-sm font-bold theme-text-heading truncate">
                            {topic.title}
                          </h4>
                          <p className="text-xs theme-text-muted line-clamp-1 mt-0.5">
                            {topic.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {isCompleted ? (
                          <Badge variant="success" size="sm" icon={<FiCheckCircle className="w-3 h-3 text-emerald-500" />}>
                            Done
                          </Badge>
                        ) : isInProgress ? (
                          <Badge variant="primary" size="sm" icon={<FiClock className="w-3 h-3 text-indigo-500" />}>
                            Active
                          </Badge>
                        ) : isLocked ? (
                          <Badge variant="locked" size="sm" icon={<FiLock className="w-3 h-3" />}>
                            Locked
                          </Badge>
                        ) : (
                          <FiChevronRight className="w-5 h-5 theme-text-muted" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
