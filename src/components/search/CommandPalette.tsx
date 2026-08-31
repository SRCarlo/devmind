import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSearch, 
  FiGrid, 
  FiBookOpen, 
  FiMap, 
  FiLayers, 
  FiArrowRight, 
  FiX
} from 'react-icons/fi';
import { MINDMAP_TOPICS } from '../../data/mindmapData';
import { COURSES_DATA } from '../../data/coursesData';
import { ROADMAPS_DATA } from '../../data/roadmapsData';
import { TECHNOLOGIES_DATA } from '../../data/technologiesData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  // Keyboard shortcut listener (Cmd/Ctrl + K and Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open triggered from parent or navbar
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate search index
  const results = useMemo(() => {
    if (!query.trim()) {
      return [
        { id: 'quick-mindmap', title: 'Knowledge Graph', sub: 'Interactive Mind Map', type: 'map', path: '/mindmap', icon: <FiGrid /> },
        { id: 'quick-roadmaps', title: 'Career Roadmaps', sub: 'Curated developer tracks', type: 'roadmap', path: '/roadmaps', icon: <FiMap /> },
        { id: 'quick-courses', title: 'Course Library', sub: 'Browse lessons and playgrounds', type: 'course', path: '/courses', icon: <FiBookOpen /> },
        { id: 'quick-tech', title: 'Tech Ecosystem', sub: 'Technology directory', type: 'tech', path: '/technologies', icon: <FiLayers /> }
      ];
    }

    const q = query.toLowerCase();
    const list: Array<{ id: string; title: string; sub: string; type: string; path: string; icon: React.ReactNode }> = [];

    // Search topics
    MINDMAP_TOPICS.forEach(topic => {
      if (topic.title.toLowerCase().includes(q) || topic.tags.some(t => t.toLowerCase().includes(q))) {
        list.push({
          id: `topic-${topic.id}`,
          title: topic.title,
          sub: `Level ${topic.levelNumber} Topic • ${topic.category}`,
          type: 'topic',
          path: '/mindmap',
          icon: <FiGrid className="text-indigo-500" />
        });
      }
    });

    // Search lessons
    COURSES_DATA.forEach(course => {
      course.modules.forEach(m => {
        m.lessons.forEach(l => {
          if (l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q)) {
            list.push({
              id: `lesson-${l.id}`,
              title: l.title,
              sub: `Lesson in ${course.title}`,
              type: 'lesson',
              path: `/learn/${course.topicId}/${l.id}`,
              icon: <FiBookOpen className="text-cyan-500" />
            });
          }
        });
      });
    });

    // Search technologies
    TECHNOLOGIES_DATA.forEach(tech => {
      if (tech.name.toLowerCase().includes(q) || tech.keyFeatures.some(f => f.toLowerCase().includes(q))) {
        list.push({
          id: `tech-${tech.id}`,
          title: tech.name,
          sub: `${tech.category} • ${tech.tagline}`,
          type: 'tech',
          path: '/technologies',
          icon: <FiLayers className="text-purple-500" />
        });
      }
    });

    // Search roadmaps
    ROADMAPS_DATA.forEach(roadmap => {
      if (roadmap.title.toLowerCase().includes(q) || roadmap.tagline.toLowerCase().includes(q)) {
        list.push({
          id: `roadmap-${roadmap.id}`,
          title: roadmap.title,
          sub: `Career Track • ${roadmap.difficulty}`,
          type: 'roadmap',
          path: '/roadmaps',
          icon: <FiMap className="text-amber-500" />
        });
      }
    });

    return list.slice(0, 10);
  }, [query]);

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-xl theme-bg-card border theme-border rounded-3xl shadow-2xl overflow-hidden z-10 select-none transition-colors duration-200"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b theme-border gap-3 theme-bg-subtle">
            <FiSearch className="w-5 h-5 theme-text-muted opacity-70" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search topics, lessons, roadmaps, tech stack..."
              className="flex-1 bg-transparent theme-text-heading placeholder-slate-400 text-sm focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg theme-text-muted hover:theme-text-heading hover:theme-bg-card"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1">
            {results.length > 0 ? (
              results.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.path)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all ${
                    selectedIndex === idx
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'theme-text-muted hover:theme-text-heading hover:theme-bg-subtle'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-black/10 dark:bg-white/10 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className={`text-xs sm:text-sm font-semibold truncate ${
                        selectedIndex === idx ? 'text-white' : 'theme-text-heading'
                      }`}>
                        {item.title}
                      </div>
                      <div className={`text-[11px] truncate ${
                        selectedIndex === idx ? 'text-white/80' : 'theme-text-muted'
                      }`}>
                        {item.sub}
                      </div>
                    </div>
                  </div>

                  <FiArrowRight className={`w-4 h-4 flex-shrink-0 ml-2 ${
                    selectedIndex === idx ? 'text-white' : 'opacity-50'
                  }`} />
                </button>
              ))
            ) : (
              <div className="text-center py-10 theme-text-muted text-xs">
                No matching results found for &quot;{query}&quot;
              </div>
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-2.5 theme-bg-subtle border-t theme-border flex items-center justify-between text-[11px] theme-text-muted">
            <span>Navigation</span>
            <div className="flex items-center gap-3">
              <span>Navigate with mouse or enter</span>
              <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono text-[10px] theme-border border">
                ESC to close
              </kbd>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
