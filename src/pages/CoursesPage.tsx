import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiBookOpen, 
  FiClock, 
  FiPlay, 
  FiSearch
} from 'react-icons/fi';
import { COURSES_DATA } from '../data/coursesData';
import { useProgress } from '../app/providers/ProgressProvider';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { getTopicIcon } from '../utils/iconMap';

export const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'JavaScript', 'React', 'TypeScript', 'Backend Awareness', 'Architecture'];

  const filteredCourses = COURSES_DATA.filter(course => {
    if (selectedCategory !== 'all' && course.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return course.title.toLowerCase().includes(q) || course.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 pb-20 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
              <FiBookOpen className="w-3.5 h-3.5" />
              <span>Interactive Course Catalog</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 text-xs font-bold">
              <span>
                {progress.mode === 'beginner' ? '🌱 Beginner Mode (Foundations Prioritized)' : progress.mode === 'pro' ? '🏛️ Pro Architect (Systems & Architecture)' : '⚡ Standard Mode (Fullstack)'}
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-extrabold theme-text-heading tracking-tight font-display">
            Explore Courses & Curriculums
          </h1>
          <p className="text-sm theme-text-muted max-w-2xl">
            Detailed syllabus with code playgrounds, interactive quizzes, and key concepts.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 theme-text-muted w-4 h-4 opacity-70" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full theme-bg-input border theme-border rounded-xl pl-10 pr-4 py-2 text-xs theme-text-heading placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'theme-bg-card border theme-border theme-text-muted hover:theme-text-heading'
            }`}
          >
            {cat === 'all' ? 'All Courses' : cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
          const completedLessons = course.modules
            .flatMap(m => m.lessons)
            .filter(l => progress.completedLessons.includes(l.id)).length;
          const percentage = Math.round((completedLessons / (totalLessons || 1)) * 100);

          return (
            <div
              key={course.id}
              className="p-6 rounded-3xl theme-bg-card border theme-border hover:border-indigo-500 shadow-sm flex flex-col justify-between transition-all duration-150 space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: `${course.color}25`, border: `1px solid ${course.color}60` }}
                  >
                    {getTopicIcon(course.iconName, 'w-6 h-6')}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">{course.level.toUpperCase()}</Badge>
                    <span className="text-xs theme-text-muted font-mono flex items-center gap-1">
                      <FiClock className="w-3.5 h-3.5" />
                      {course.estimatedHours}h
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold theme-text-heading leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-xs theme-text-muted mt-1.5 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Modules summary */}
                <div className="p-3 rounded-xl theme-bg-subtle border theme-border space-y-1.5">
                  <div className="text-[11px] font-bold theme-text-muted uppercase tracking-wider">
                    {course.modules.length} Modules Included:
                  </div>
                  <div className="space-y-1">
                    {course.modules.map(m => (
                      <div key={m.id} className="text-xs theme-text-main flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        <span className="truncate">{m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Progress & Launch CTA */}
              <div className="space-y-3 pt-3 border-t theme-border">
                <div className="flex justify-between text-xs theme-text-muted font-medium">
                  <span>{completedLessons} of {totalLessons} Lessons</span>
                  <span className="font-mono theme-text-heading font-bold">{percentage}%</span>
                </div>
                <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <Button
                  size="md"
                  variant="primary"
                  className="w-full"
                  icon={<FiPlay />}
                  onClick={() => {
                    const firstLesson = course.modules[0]?.lessons[0];
                    if (firstLesson) {
                      navigate(`/learn/${course.topicId}/${firstLesson.id}`);
                    }
                  }}
                >
                  Start Course
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
