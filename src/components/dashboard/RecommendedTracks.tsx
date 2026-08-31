import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import { MINDMAP_TOPICS } from '../../data/mindmapData';
import { useProgress } from '../../app/providers/ProgressProvider';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { getTopicIcon } from '../../utils/iconMap';

export const RecommendedTracks: React.FC = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const recommended = MINDMAP_TOPICS.filter(topic => {
    // Mode-aware filtering
    if (progress.mode === 'beginner' && topic.levelNumber > 1) return false;
    if (progress.mode === 'pro' && topic.levelNumber < 2) return false;

    const isCompleted = progress.completedTopics.includes(topic.id);
    const prereqsMet = topic.prerequisites.every(p => progress.completedTopics.includes(p));
    return !isCompleted && (progress.mode === 'pro' || prereqsMet);
  }).slice(0, 3);

  return (
    <div className="p-6 rounded-2xl theme-bg-card border theme-border shadow-sm space-y-5 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold theme-text-heading tracking-tight">Recommended Next Steps</h3>
          <p className="text-xs theme-text-muted">Based on your completed prerequisites and study history</p>
        </div>
        <button
          onClick={() => navigate('/mindmap')}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
        >
          View Map <FiArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {recommended.length > 0 ? (
          recommended.map(topic => (
            <div
              key={topic.id}
              onClick={() => navigate('/mindmap')}
              className="p-4 rounded-xl theme-bg-subtle border theme-border hover:border-indigo-500 cursor-pointer transition-all duration-150 flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: `${topic.color}25`, border: `1px solid ${topic.color}60` }}
                >
                  {getTopicIcon(topic.iconName, 'w-5 h-5')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <Badge variant="primary" size="sm">Level {topic.levelNumber}</Badge>
                    <span className="text-[11px] theme-text-muted font-medium truncate">{topic.category}</span>
                  </div>
                  <h4 className="text-sm font-bold theme-text-heading group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                    {topic.title}
                  </h4>
                  <p className="text-xs theme-text-muted line-clamp-1">{topic.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs font-mono text-amber-500 font-bold hidden sm:inline">
                  +{topic.xpReward} XP
                </span>
                <Button size="sm" variant="primary" icon={<FiPlay className="w-3 h-3" />}>
                  Learn
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 theme-text-muted text-xs">
            🎉 All available current tier topics completed! Explore advanced levels in Knowledge Graph.
          </div>
        )}
      </div>
    </div>
  );
};
