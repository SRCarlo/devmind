import React, { useState } from 'react';
import { useParams, useNavigate, Link, useOutletContext } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiArrowRight, 
  FiCheckCircle, 
  FiBookmark, 
  FiClock, 
  FiZap, 
  FiBookOpen, 
  FiInfo, 
  FiAlertTriangle, 
  FiTerminal,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import { COURSES_DATA } from '../../data/coursesData';
import { MINDMAP_TOPICS } from '../../data/mindmapData';
import { useProgress } from '../../app/providers/ProgressProvider';
import { CodePlayground } from './CodePlayground';
import { QuizComponent } from './QuizComponent';
import { NotesEditor } from './NotesEditor';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { getTopicIcon } from '../../utils/iconMap';

interface OutletContextType {
  onOpenAI: (topicTitle: string) => void;
}

export const LessonViewer: React.FC = () => {
  const { topicId, lessonId } = useParams<{ topicId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { progress, markLessonComplete, toggleBookmarkLesson } = useProgress();
  const context = useOutletContext<OutletContextType>();
  const handleOpenAI = context?.onOpenAI || ((title: string) => console.log('AI:', title));

  const [isSyllabusCollapsed, setIsSyllabusCollapsed] = useState(false);

  // Find course and lesson
  const course = COURSES_DATA.find(c => c.topicId === topicId) || COURSES_DATA[0];
  const topic = MINDMAP_TOPICS.find(t => t.id === topicId) || MINDMAP_TOPICS[0];

  // Flatten lessons to find current and prev/next
  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentLessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const lesson = allLessons[currentLessonIndex] || allLessons[0];

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const isCompleted = progress.completedLessons.includes(lesson.id);
  const isBookmarked = progress.bookmarkedLessons.includes(lesson.id);

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id, topic.id, lesson.xp);
  };

  return (
    <div className="min-h-full theme-bg-page theme-text-main flex flex-col lg:flex-row transition-colors duration-200">
      {/* Left Sidebar: Course Syllabus & Navigation */}
      <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r theme-border theme-bg-card p-4 sm:p-5 overflow-y-auto max-h-[45vh] lg:max-h-[calc(100vh-4rem-2.5rem)] lg:sticky lg:top-16 z-10 select-none">
        <div className="flex items-center justify-between mb-3">
          <Link
            to="/mindmap"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            <FiArrowLeft className="w-3.5 h-3.5" /> Back to Knowledge Graph
          </Link>

          <button
            onClick={() => setIsSyllabusCollapsed(!isSyllabusCollapsed)}
            className="lg:hidden text-xs theme-text-muted hover:theme-text-heading flex items-center gap-1"
          >
            <span>{isSyllabusCollapsed ? 'Show Syllabus' : 'Hide'}</span>
            {isSyllabusCollapsed ? <FiChevronDown className="w-3.5 h-3.5" /> : <FiChevronUp className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Course Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b theme-border">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-sm"
            style={{ backgroundColor: `${topic.color}25`, border: `1px solid ${topic.color}60` }}
          >
            {getTopicIcon(topic.iconName, 'w-5 h-5')}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold theme-text-heading truncate">{course.title}</h3>
            <p className="text-xs theme-text-muted">{allLessons.length} Lessons in Curriculum</p>
          </div>
        </div>

        {/* Modules Accordion (Collapsible on mobile) */}
        {!isSyllabusCollapsed && (
          <div className="space-y-4">
            {course.modules.map((mod) => (
              <div key={mod.id} className="space-y-2">
                <div className="text-[11px] font-bold theme-text-muted uppercase tracking-wider">
                  {mod.title}
                </div>

                <div className="space-y-1">
                  {mod.lessons.map(l => {
                    const isCurrent = l.id === lesson.id;
                    const isDone = progress.completedLessons.includes(l.id);

                    return (
                      <button
                        key={l.id}
                        onClick={() => navigate(`/learn/${topic.id}/${l.id}`)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                          isCurrent
                            ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                            : 'theme-text-muted hover:theme-text-heading hover:theme-bg-subtle'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isDone ? (
                            <FiCheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <span
                              className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 ${
                                isCurrent ? 'border-white' : 'border-slate-400'
                              }`}
                            />
                          )}
                          <span className="truncate">{l.title}</span>
                        </div>
                        <span className={`text-[10px] font-mono flex-shrink-0 ml-2 ${isCurrent ? 'text-white/80' : 'theme-text-muted'}`}>
                          {l.estimatedMinutes}m
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto p-4 sm:p-8 lg:p-10 space-y-8">
        {/* Lesson Breadcrumb & Meta */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs theme-text-muted">
              <Badge variant="primary">{topic.category}</Badge>
              <span>•</span>
              <span>Level {topic.levelNumber}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <FiClock className="w-3.5 h-3.5 opacity-70" />
                <span>{lesson.estimatedMinutes} mins</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <FiZap className="w-3.5 h-3.5" />
                <span>+{lesson.xp} XP</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={isBookmarked ? 'primary' : 'outline'}
                icon={<FiBookmark className={isBookmarked ? 'fill-current' : ''} />}
                onClick={() => toggleBookmarkLesson(lesson.id)}
              >
                {isBookmarked ? 'Saved' : 'Bookmark'}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                icon={<LuSparkles className="text-indigo-500" />}
                onClick={() => handleOpenAI(`${topic.title} - ${lesson.title}`)}
              >
                Ask AI
              </Button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold theme-text-heading tracking-tight leading-tight">
            {lesson.title}
          </h1>
          <p className="text-sm sm:text-base theme-text-main leading-relaxed font-medium">
            {lesson.summary}
          </p>
        </div>

        {/* Lesson Core Sections */}
        <div className="space-y-8 theme-text-main text-sm sm:text-base leading-relaxed">
          {lesson.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold theme-text-heading tracking-tight border-b theme-border pb-2">
                {sec.title}
              </h2>
              <p className="whitespace-pre-line leading-relaxed">{sec.content}</p>

              {/* Code Snippet */}
              {sec.codeSnippet && (
                <div className="rounded-xl theme-bg-card border theme-border p-4 font-mono-code text-xs sm:text-sm theme-text-heading overflow-x-auto shadow-sm">
                  {sec.codeSnippet.caption && (
                    <div className="text-[11px] theme-text-muted font-mono mb-2 pb-1 border-b theme-border">
                      // {sec.codeSnippet.caption}
                    </div>
                  )}
                  <pre className="text-indigo-600 dark:text-indigo-300 font-mono">
                    <code>{sec.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Callout box */}
              {sec.callout && (
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                    sec.callout.type === 'pro-tip'
                      ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-700 dark:text-indigo-200'
                      : sec.callout.type === 'warning'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-200'
                      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-200'
                  }`}
                >
                  <div className="mt-0.5">
                    {sec.callout.type === 'warning' ? (
                      <FiAlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    ) : (
                      <FiInfo className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{sec.callout.title}</h4>
                    <p className="leading-relaxed opacity-95">{sec.callout.text}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Code Playground */}
        {lesson.interactiveCode && (
          <section className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <FiTerminal className="w-5 h-5 text-indigo-500" />
              <h3 className="text-base font-bold theme-text-heading">Interactive Code Sandbox</h3>
            </div>
            <CodePlayground example={lesson.interactiveCode} />
          </section>
        )}

        {/* Knowledge Check Quiz */}
        {lesson.quiz && (
          <section className="pt-4">
            <QuizComponent quiz={lesson.quiz} />
          </section>
        )}

        {/* Notes Editor for this topic */}
        <section className="pt-4">
          <NotesEditor topicId={topic.id} topicTitle={topic.title} />
        </section>

        {/* Lesson Bottom Completion & Next Bar (Fully Responsive) */}
        <div className="pt-6 border-t theme-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            size="md"
            variant={isCompleted ? 'secondary' : 'primary'}
            icon={<FiCheckCircle className={isCompleted ? 'text-emerald-500' : ''} />}
            onClick={handleMarkComplete}
            className="w-full sm:w-auto"
          >
            {isCompleted ? 'Completed ✓ (+XP Earned)' : 'Mark Lesson Complete (+XP)'}
          </Button>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {prevLesson && (
              <Button
                size="md"
                variant="outline"
                icon={<FiArrowLeft />}
                onClick={() => navigate(`/learn/${topic.id}/${prevLesson.id}`)}
              >
                Previous
              </Button>
            )}
            {nextLesson ? (
              <Button
                size="md"
                variant="primary"
                onClick={() => navigate(`/learn/${topic.id}/${nextLesson.id}`)}
              >
                <span>Next Lesson</span>
                <FiArrowRight className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="md"
                variant="primary"
                onClick={() => navigate('/mindmap')}
              >
                Back to Map
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
