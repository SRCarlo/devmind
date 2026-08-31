import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiCheckCircle, 
  FiBookmark, 
  FiPlay, 
  FiClock, 
  FiZap, 
  FiEdit3, 
  FiSave
} from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import { MindMapTopic } from '../../types/mindmap';
import { useProgress } from '../../app/providers/ProgressProvider';
import { getTopicIcon } from '../../utils/iconMap';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { COURSES_DATA } from '../../data/coursesData';
import { MINDMAP_TOPICS } from '../../data/mindmapData';

interface NodeDetailsDrawerProps {
  topic: MindMapTopic | null;
  onClose: () => void;
  onOpenAI: (topicTitle: string) => void;
}

export const NodeDetailsDrawer: React.FC<NodeDetailsDrawerProps> = ({
  topic,
  onClose,
  onOpenAI
}) => {
  const navigate = useNavigate();
  const { progress, markTopicComplete, toggleBookmarkTopic, saveTopicNote } = useProgress();

  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'notes' | 'interview'>('overview');
  const [noteContent, setNoteContent] = useState('');

  useEffect(() => {
    if (topic) {
      setNoteContent(progress.notes[topic.id] || '');
      setActiveTab('overview');
    }
  }, [topic, progress.notes]);

  if (!topic) return null;

  const isCompleted = progress.completedTopics.includes(topic.id);
  const isBookmarked = progress.bookmarkedTopics.includes(topic.id);
  const course = COURSES_DATA.find(c => c.topicId === topic.id);

  // Check prerequisites status
  const prereqDetails = topic.prerequisites.map(prereqId => {
    const pTopic = MINDMAP_TOPICS.find(t => t.id === prereqId);
    const pDone = progress.completedTopics.includes(prereqId);
    return {
      id: prereqId,
      title: pTopic?.title || prereqId,
      isDone: pDone
    };
  });

  const handleSaveNote = () => {
    saveTopicNote(topic.id, noteContent);
  };

  const handleStartLearning = () => {
    if (course && course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      const firstLesson = course.modules[0].lessons[0];
      navigate(`/learn/${topic.id}/${firstLesson.id}`);
    } else {
      navigate('/courses');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"
        />

        {/* Slide-out Drawer Panel */}
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-full sm:max-w-xl theme-bg-card border-l theme-border shadow-2xl z-50 flex flex-col pointer-events-auto select-none transition-colors duration-200"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b theme-border theme-bg-nav">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center text-white shadow-md flex-shrink-0"
                  style={{ backgroundColor: `${topic.color}25`, border: `1px solid ${topic.color}60` }}
                >
                  {getTopicIcon(topic.iconName, 'w-5 h-5 sm:w-6 sm:h-6')}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Badge variant="primary" size="sm">
                      Level {topic.levelNumber}
                    </Badge>
                    <Badge variant="cyan" size="sm">
                      {topic.category}
                    </Badge>
                  </div>
                  <h2 className="text-base sm:text-xl font-bold theme-text-heading tracking-tight leading-tight truncate">
                    {topic.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl theme-text-muted hover:theme-text-heading hover:theme-bg-subtle transition-colors flex-shrink-0"
                aria-label="Close Drawer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Meta */}
            <div className="flex items-center gap-4 text-xs theme-text-muted">
              <div className="flex items-center gap-1.5">
                <FiClock className="w-3.5 h-3.5 text-indigo-500" />
                <span>{topic.estimatedHours} Hours</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <FiZap className="w-3.5 h-3.5" />
                <span>+{topic.xpReward} XP Reward</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pt-1">
              {(['overview', 'lessons', 'notes', 'interview'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'theme-text-muted hover:theme-text-heading hover:theme-bg-subtle'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Drawer Body Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 pb-20">
            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6 text-xs sm:text-sm">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider theme-text-muted mb-2">
                    Description
                  </h3>
                  <p className="theme-text-main leading-relaxed font-medium">
                    {topic.description}
                  </p>
                </div>

                {/* Prerequisites */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider theme-text-muted mb-2">
                    Prerequisites
                  </h3>
                  {prereqDetails.length > 0 ? (
                    <div className="space-y-2">
                      {prereqDetails.map(p => (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3 rounded-xl theme-bg-subtle border theme-border"
                        >
                          <span className="font-medium theme-text-heading">{p.title}</span>
                          <Badge variant={p.isDone ? 'success' : 'locked'} size="sm">
                            {p.isDone ? 'Completed ✓' : 'Required'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ No prerequisites required. You can start immediately!
                    </p>
                  )}
                </div>

                {/* Key Concepts / Takeaways */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider theme-text-muted mb-2">
                    Core Concepts
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {topic.keyTakeaways.map((concept, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl theme-bg-subtle border theme-border text-xs theme-text-heading font-medium"
                      >
                        • {concept}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider theme-text-muted mb-2">
                    Domain Tags
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {topic.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono theme-bg-subtle theme-text-muted border theme-border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Lessons */}
            {activeTab === 'lessons' && (
              <div className="space-y-4">
                {course ? (
                  course.modules.map((mod, modIdx) => (
                    <div key={mod.id} className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider theme-text-muted">
                        Module {modIdx + 1}: {mod.title}
                      </h4>
                      <div className="space-y-2">
                        {mod.lessons.map(l => {
                          const isDone = progress.completedLessons.includes(l.id);
                          return (
                            <div
                              key={l.id}
                              onClick={() => {
                                navigate(`/learn/${topic.id}/${l.id}`);
                                onClose();
                              }}
                              className="p-3 rounded-xl theme-bg-subtle border theme-border hover:border-indigo-500 transition-all cursor-pointer flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {isDone ? (
                                  <FiCheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                ) : (
                                  <span className="w-4 h-4 rounded-full border border-slate-400 flex-shrink-0" />
                                )}
                                <div className="min-w-0">
                                  <h5 className="text-xs font-bold theme-text-heading truncate">
                                    {l.title}
                                  </h5>
                                  <p className="text-[11px] theme-text-muted truncate">
                                    {l.summary}
                                  </p>
                                </div>
                              </div>
                              <span className="text-[11px] font-mono theme-text-muted flex-shrink-0">
                                {l.estimatedMinutes}m
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 theme-text-muted text-xs">
                    Curriculum content available in main courses library.
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Notes */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider theme-text-muted">
                    Study Notes for {topic.title}
                  </span>
                  <Button
                    size="sm"
                    variant="primary"
                    icon={<FiSave />}
                    onClick={handleSaveNote}
                  >
                    Save Note
                  </Button>
                </div>
                <textarea
                  value={noteContent}
                  onChange={e => setNoteContent(e.target.value)}
                  placeholder="Record your insights, key takeaways, architectural diagrams notes..."
                  className="w-full h-64 p-4 rounded-2xl theme-bg-input border theme-border theme-text-heading text-xs sm:text-sm focus:outline-none focus:border-indigo-500 font-mono resize-none shadow-inner"
                />
              </div>
            )}

            {/* Tab 4: Interview Questions */}
            {activeTab === 'interview' && (
              <div className="space-y-4">
                {topic.interviewQuestions.map((iq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl theme-bg-subtle border theme-border space-y-2"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold text-xs">Q{idx + 1}:</span>
                      <h4 className="text-xs font-bold theme-text-heading">{iq.question}</h4>
                    </div>
                    <p className="text-xs theme-text-muted leading-relaxed pl-5">
                      {iq.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Footer (Fully Responsive for All Mobiles) */}
          <div className="p-3 sm:p-4 border-t theme-border theme-bg-nav flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2">
              <Button
                size="sm"
                variant={isBookmarked ? 'primary' : 'outline'}
                icon={<FiBookmark className={isBookmarked ? 'fill-current' : ''} />}
                onClick={() => toggleBookmarkTopic(topic.id)}
                className="text-[11px] sm:text-xs"
              >
                {isBookmarked ? 'Saved' : 'Bookmark'}
              </Button>

              <Button
                size="sm"
                variant={isCompleted ? 'secondary' : 'outline'}
                icon={<FiCheckCircle className={isCompleted ? 'text-emerald-500' : ''} />}
                onClick={() => markTopicComplete(topic.id, topic.xpReward)}
                className="text-[11px] sm:text-xs"
              >
                {isCompleted ? 'Done' : 'Complete'}
              </Button>

              <Button
                size="sm"
                variant="secondary"
                icon={<LuSparkles className="text-indigo-500" />}
                onClick={() => onOpenAI(topic.title)}
                title="Ask DevMind AI Copilot"
                className="text-[11px] sm:text-xs"
              >
                Ask AI
              </Button>
            </div>

            <Button
              size="sm"
              variant="primary"
              icon={<FiPlay />}
              onClick={handleStartLearning}
              className="w-full sm:w-auto text-xs font-bold"
            >
              Start Lesson
            </Button>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
};
