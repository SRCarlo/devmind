import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiMap, 
  FiClock, 
  FiCheckCircle, 
  FiCompass,
  FiTarget
} from 'react-icons/fi';
import { ROADMAPS_DATA } from '../data/roadmapsData';
import { useProgress } from '../app/providers/ProgressProvider';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const RoadmapsPage: React.FC = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const [selectedRoadmapId, setSelectedRoadmapId] = useState(ROADMAPS_DATA[0]?.id || 'frontend-core');

  // Auto-sync roadmap to match active experience tier
  React.useEffect(() => {
    if (progress.mode === 'beginner') {
      setSelectedRoadmapId(ROADMAPS_DATA[0]?.id || 'frontend-core');
    } else if (progress.mode === 'pro') {
      setSelectedRoadmapId(ROADMAPS_DATA[ROADMAPS_DATA.length - 1]?.id || 'fullstack-architect');
    }
  }, [progress.mode]);

  const selectedRoadmap = ROADMAPS_DATA.find(r => r.id === selectedRoadmapId) || ROADMAPS_DATA[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 pb-20 transition-colors duration-200">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
            <FiCompass className="w-3.5 h-3.5" />
            <span>Curated Learning Tracks</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-bold">
            <span>
              {progress.mode === 'beginner' ? '🌱 Beginner Mode (Foundations Track Recommended)' : progress.mode === 'pro' ? '🏛️ Pro Architect (Systems & Scale Recommended)' : '⚡ Standard Mode (Fullstack Track Active)'}
            </span>
          </div>
        </div>
        <h1 className="text-3xl font-extrabold theme-text-heading tracking-tight font-display">
          Developer Career Roadmaps
        </h1>
        <p className="text-sm theme-text-muted max-w-2xl">
          Structured step-by-step tracks from zero fundamentals to professional level development.
        </p>
      </div>

      {/* Roadmap Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROADMAPS_DATA.map(roadmap => {
          const isSelected = roadmap.id === selectedRoadmapId;
          const completedSteps = roadmap.steps.filter(s => progress.completedTopics.includes(s.topicId)).length;
          const percentage = Math.round((completedSteps / (roadmap.steps.length || 1)) * 100);

          return (
            <div
              key={roadmap.id}
              onClick={() => setSelectedRoadmapId(roadmap.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-150 ${
                isSelected
                  ? 'bg-indigo-500/10 border-indigo-500 shadow-sm ring-1 ring-indigo-500/30'
                  : 'theme-bg-card theme-border hover:border-indigo-400'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Badge variant={isSelected ? 'primary' : 'default'} size="sm">
                  {roadmap.difficulty.toUpperCase()}
                </Badge>
                <span className="text-xs theme-text-muted font-mono">
                  {roadmap.totalEstimatedWeeks}w
                </span>
              </div>
              <h3 className="text-sm font-bold theme-text-heading mb-1 leading-snug">{roadmap.title}</h3>
              <p className="text-xs theme-text-muted line-clamp-2 mb-4">{roadmap.tagline}</p>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] theme-text-muted">
                  <span>Progress</span>
                  <span className="font-mono theme-text-heading font-semibold">{percentage}%</span>
                </div>
                <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Roadmap Path Visualizer */}
      <div className="p-6 sm:p-8 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b theme-border pb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <h2 className="text-2xl font-bold theme-text-heading tracking-tight">{selectedRoadmap.title}</h2>
              <Badge variant="cyan">{selectedRoadmap.difficulty}</Badge>
            </div>
            <p className="text-sm theme-text-main max-w-2xl">{selectedRoadmap.description}</p>
          </div>

          <Button
            size="md"
            variant="primary"
            icon={<FiMap />}
            onClick={() => navigate('/mindmap')}
          >
            Open in Knowledge Graph
          </Button>
        </div>

        {/* Expected Outcomes */}
        <div className="p-5 rounded-2xl theme-bg-subtle border theme-border">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-3">
            <FiTarget className="w-4 h-4" />
            <span>Target Learning Outcomes</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {selectedRoadmap.outcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm theme-text-main">
                <FiCheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Vertical Connected Tree */}
        <div className="space-y-6">
          <h3 className="text-base font-bold theme-text-heading tracking-tight">Milestone Sequence</h3>
          <div className="relative pl-6 sm:pl-8 border-l-2 border-indigo-500/30 space-y-6">
            {selectedRoadmap.steps.map((step, idx) => {
              const isTopicDone = progress.completedTopics.includes(step.topicId);

              return (
                <div key={step.id} className="relative group">
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      isTopicDone
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-sm'
                        : step.milestone
                        ? 'bg-indigo-600 border-indigo-400 text-white'
                        : 'theme-bg-card theme-border theme-text-muted'
                    }`}
                  >
                    {isTopicDone ? '✓' : idx + 1}
                  </div>

                  <div className="p-5 rounded-2xl theme-bg-subtle border theme-border hover:border-indigo-400 transition-all space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-base font-bold theme-text-heading">{step.title}</h4>
                        {step.milestone && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                            Major Milestone
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs theme-text-muted">
                        <FiClock className="w-3.5 h-3.5" />
                        <span>{step.estimatedDuration}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm theme-text-main">{step.description}</p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t theme-border">
                      <div className="flex flex-wrap gap-1.5">
                        {step.essentialSkills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 rounded-md theme-bg-card border theme-border text-[11px] theme-text-muted font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => navigate('/mindmap')}
                        className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
                      >
                        Inspect Node →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
