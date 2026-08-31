import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiBookmark, 
  FiGrid, 
  FiBookOpen, 
  FiLayers, 
  FiTrash2, 
  FiEdit2, 
  FiPlay
} from 'react-icons/fi';
import { useProgress } from '../app/providers/ProgressProvider';
import { MINDMAP_TOPICS } from '../data/mindmapData';
import { COURSES_DATA } from '../data/coursesData';
import { TECHNOLOGIES_DATA } from '../data/technologiesData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { getTopicIcon } from '../utils/iconMap';

export const BookmarksPage: React.FC = () => {
  const navigate = useNavigate();
  const { progress, toggleBookmarkTopic, toggleBookmarkLesson, toggleBookmarkTech } = useProgress();
  const [activeTab, setActiveTab] = useState('topics');

  const bookmarkedTopicsList = MINDMAP_TOPICS.filter(t => progress.bookmarkedTopics.includes(t.id));
  const bookmarkedTechList = TECHNOLOGIES_DATA.filter(t => progress.bookmarkedTech.includes(t.id));

  const allLessons = COURSES_DATA.flatMap(c => c.modules.flatMap(m => m.lessons));
  const bookmarkedLessonsList = allLessons.filter(l => progress.bookmarkedLessons.includes(l.id));

  const notesList = Object.entries(progress.notes).map(([topicId, note]) => {
    const topic = MINDMAP_TOPICS.find(t => t.id === topicId);
    return {
      topicId,
      topicTitle: topic?.title || topicId,
      note
    };
  });

  const tabItems = [
    { id: 'topics', label: 'Topics', icon: <FiGrid />, badge: bookmarkedTopicsList.length },
    { id: 'lessons', label: 'Lessons', icon: <FiBookOpen />, badge: bookmarkedLessonsList.length },
    { id: 'tech', label: 'Technologies', icon: <FiLayers />, badge: bookmarkedTechList.length },
    { id: 'notes', label: 'Notebook', icon: <FiEdit2 />, badge: notesList.length }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 pb-20 transition-colors duration-200">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-semibold">
          <FiBookmark className="w-3.5 h-3.5" />
          <span>Personal Study Library</span>
        </div>
        <h1 className="text-3xl font-extrabold theme-text-heading tracking-tight font-display">
          Saved Bookmarks & Notes
        </h1>
        <p className="text-sm theme-text-muted max-w-2xl">
          Quickly access your saved roadmap nodes, lessons, technology cards, and personal revision notes.
        </p>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabItems} activeTab={activeTab} onChange={setActiveTab} />

      {/* Content based on Active Tab */}
      {activeTab === 'topics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedTopicsList.length > 0 ? (
            bookmarkedTopicsList.map(topic => (
              <div
                key={topic.id}
                className="p-6 rounded-3xl theme-bg-card border theme-border hover:border-indigo-500 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: `${topic.color}25`, border: `1px solid ${topic.color}60` }}
                    >
                      {getTopicIcon(topic.iconName, 'w-5 h-5')}
                    </div>
                    <button
                      onClick={() => toggleBookmarkTopic(topic.id)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-rose-500 p-1.5 rounded-lg hover:theme-bg-subtle transition-colors"
                      title="Remove bookmark"
                    >
                      <FiBookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <h3 className="text-base font-bold theme-text-heading">{topic.title}</h3>
                  <p className="text-xs theme-text-muted mt-1 line-clamp-2">{topic.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t theme-border">
                  <Badge variant="primary">Level {topic.levelNumber}</Badge>
                  <Button size="sm" variant="primary" onClick={() => navigate('/mindmap')}>
                    Inspect in Graph
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 p-6 rounded-3xl theme-bg-card border theme-border space-y-3">
              <FiBookmark className="w-8 h-8 opacity-40 mx-auto" />
              <h4 className="text-sm font-bold theme-text-heading">No topics bookmarked yet</h4>
              <p className="text-xs theme-text-muted">Save topics from the Knowledge Graph to revisit them anytime.</p>
              <Button size="sm" variant="primary" onClick={() => navigate('/mindmap')}>
                Explore Knowledge Graph
              </Button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'lessons' && (
        <div className="space-y-3 max-w-3xl">
          {bookmarkedLessonsList.length > 0 ? (
            bookmarkedLessonsList.map(lesson => (
              <div
                key={lesson.id}
                className="p-4 rounded-2xl theme-bg-card border theme-border hover:border-indigo-500 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                    <FiBookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold theme-text-heading">{lesson.title}</h4>
                    <p className="text-xs theme-text-muted line-clamp-1">{lesson.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    icon={<FiPlay />}
                    onClick={() => navigate(`/learn/${lesson.topicId}/${lesson.id}`)}
                  >
                    Open Lesson
                  </Button>
                  <button
                    onClick={() => toggleBookmarkLesson(lesson.id)}
                    className="theme-text-muted hover:text-rose-500 p-2 rounded-lg hover:theme-bg-subtle"
                    title="Remove"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 p-6 rounded-3xl theme-bg-card border theme-border space-y-3">
              <FiBookOpen className="w-8 h-8 opacity-40 mx-auto" />
              <h4 className="text-sm font-bold theme-text-heading">No lessons bookmarked</h4>
              <p className="text-xs theme-text-muted">Save lessons during your study sessions for quick access.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'tech' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedTechList.length > 0 ? (
            bookmarkedTechList.map(tech => (
              <div
                key={tech.id}
                className="p-6 rounded-3xl theme-bg-card border theme-border shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                      style={{ backgroundColor: `${tech.color}25`, border: `1px solid ${tech.color}60` }}
                    >
                      {getTopicIcon(tech.iconName, 'w-5 h-5')}
                    </div>
                    <button
                      onClick={() => toggleBookmarkTech(tech.id)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-rose-500 p-1.5 rounded-lg hover:theme-bg-subtle"
                    >
                      <FiBookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                  <h3 className="text-base font-bold theme-text-heading">{tech.name}</h3>
                  <p className="text-xs theme-text-muted mt-1 line-clamp-2">{tech.description}</p>
                </div>
                <div className="pt-3 border-t theme-border flex justify-between items-center text-xs">
                  <span className="text-indigo-600 dark:text-indigo-400 font-mono">{tech.ecosystemRole}</span>
                  <a
                    href={tech.documentationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="theme-text-heading hover:underline font-semibold"
                  >
                    Docs
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 p-6 rounded-3xl theme-bg-card border theme-border space-y-3">
              <FiLayers className="w-8 h-8 opacity-40 mx-auto" />
              <h4 className="text-sm font-bold theme-text-heading">No technologies saved</h4>
              <p className="text-xs theme-text-muted">Save technologies from the directory for quick reference.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notesList.length > 0 ? (
            notesList.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl theme-bg-card border theme-border shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between border-b theme-border pb-3">
                  <h4 className="text-sm font-bold theme-text-heading flex items-center gap-2">
                    <FiEdit2 className="text-indigo-500" />
                    <span>{item.topicTitle}</span>
                  </h4>
                  <Badge variant="cyan" size="sm">Personal Note</Badge>
                </div>
                <p className="text-xs sm:text-sm theme-text-main font-mono-code whitespace-pre-wrap leading-relaxed theme-bg-subtle p-4 rounded-xl border theme-border">
                  {item.note}
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 p-6 rounded-3xl theme-bg-card border theme-border space-y-3">
              <FiEdit2 className="w-8 h-8 opacity-40 mx-auto" />
              <h4 className="text-sm font-bold theme-text-heading">Notebook is empty</h4>
              <p className="text-xs theme-text-muted">Add notes on any topic drawer or lesson page to see them here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
