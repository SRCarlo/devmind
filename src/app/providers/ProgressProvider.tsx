import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { UserProgressState } from '../../types/progress';
import { ACHIEVEMENTS_DATA } from '../../data/achievementsData';
import { useToast } from './ToastProvider';

const STORAGE_KEY = 'devmind_user_progress_v2';

const today = new Date().toISOString().split('T')[0];

const INITIAL_STATE: UserProgressState = {
  completedTopics: [],
  inProgressTopics: ['web-fundamentals'],
  completedLessons: [],
  bookmarkedTopics: [],
  bookmarkedLessons: [],
  bookmarkedTech: [],
  xp: 0,
  level: 1,
  streakDays: 1,
  lastActiveDate: today,
  streakHistory: [today],
  achievements: [],
  quizAnswers: {},
  notes: {},
  mode: 'standard',
  theme: 'dark'
};

interface ProgressContextType {
  progress: UserProgressState;
  markTopicComplete: (topicId: string, xpReward?: number) => void;
  markTopicInProgress: (topicId: string) => void;
  markLessonComplete: (lessonId: string, topicId: string, xpReward?: number) => void;
  toggleBookmarkTopic: (topicId: string) => void;
  toggleBookmarkLesson: (lessonId: string) => void;
  toggleBookmarkTech: (techId: string) => void;
  saveTopicNote: (topicId: string, noteContent: string) => void;
  recordQuizAnswer: (quizId: string, answeredIndex: number, isCorrect: boolean, xpReward?: number) => void;
  setLearningMode: (mode: 'standard' | 'beginner' | 'pro') => void;
  addXP: (amount: number, reason?: string) => void;
  resetProgress: () => void;
  exportProgressJSON: () => string;
  importProgressJSON: (jsonStr: string) => boolean;
  triggerConfetti: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [progress, setProgress] = useState<UserProgressState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse localStorage progress:', e);
    }
    return INITIAL_STATE;
  });

  // Calculate Level from XP (Level formula: 1 + floor(XP / 200))
  const calculateLevel = (currentXP: number): number => {
    return Math.floor(currentXP / 200) + 1;
  };

  // Trigger celebration confetti
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.75 }
      });
    } catch (e) {
      // Confetti fallback
    }
  }, []);

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [progress]);

  // Real-time daily streak calculation
  useEffect(() => {
    const todayDate = new Date().toISOString().split('T')[0];
    setProgress(prev => {
      if (prev.lastActiveDate === todayDate) {
        return prev;
      }

      const lastDate = new Date(prev.lastActiveDate);
      const currentDate = new Date(todayDate);
      const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      let newStreak = prev.streakDays;
      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }

      const updatedHistory = Array.from(new Set([...prev.streakHistory, todayDate]));

      return {
        ...prev,
        lastActiveDate: todayDate,
        streakDays: newStreak,
        streakHistory: updatedHistory
      };
    });
  }, []);

  // Check and award achievements
  const checkAchievements = useCallback((state: UserProgressState) => {
    const unlocked = [...state.achievements];
    let xpBonus = 0;

    ACHIEVEMENTS_DATA.forEach(ach => {
      if (unlocked.includes(ach.id)) return;

      let qualify = false;
      if (ach.id === 'ach-first-step' && state.completedLessons.length >= 1) qualify = true;
      if (ach.id === 'ach-streak-3' && state.streakDays >= 3) qualify = true;
      if (ach.id === 'ach-streak-7' && state.streakDays >= 7) qualify = true;
      if (ach.id === 'ach-quiz-master' && Object.values(state.quizAnswers).filter(a => a.isCorrect).length >= 3) qualify = true;
      if (ach.id === 'ach-topic-conqueror' && state.completedTopics.length >= 1) qualify = true;
      if (ach.id === 'ach-architect-master' && state.completedTopics.includes('frontend-architecture')) qualify = true;

      if (qualify) {
        unlocked.push(ach.id);
        xpBonus += ach.xpReward;
        showToast(`🏆 Achievement Unlocked: ${ach.title}! (+${ach.xpReward} XP)`, 'success');
      }
    });

    if (xpBonus > 0) {
      triggerConfetti();
    }

    return { unlocked, xpBonus };
  }, [showToast, triggerConfetti]);

  // Add XP
  const addXP = useCallback((amount: number, reason?: string) => {
    setProgress(prev => {
      const newXP = prev.xp + amount;
      const oldLevel = prev.level;
      const newLevel = calculateLevel(newXP);

      if (newLevel > oldLevel) {
        showToast(`🎉 Level Up! You reached Level ${newLevel}!`, 'success');
        triggerConfetti();
      } else if (reason) {
        showToast(`⚡ +${amount} XP: ${reason}`, 'info');
      }

      const intermediate = {
        ...prev,
        xp: newXP,
        level: newLevel
      };

      const { unlocked, xpBonus } = checkAchievements(intermediate);
      if (xpBonus > 0) {
        return {
          ...intermediate,
          xp: newXP + xpBonus,
          level: calculateLevel(newXP + xpBonus),
          achievements: unlocked
        };
      }

      return intermediate;
    });
  }, [showToast, triggerConfetti, checkAchievements]);

  // Mark Topic Complete
  const markTopicComplete = useCallback((topicId: string, xpReward = 150) => {
    setProgress(prev => {
      if (prev.completedTopics.includes(topicId)) return prev;

      const newCompleted = [...prev.completedTopics, topicId];
      const newInProgress = prev.inProgressTopics.filter(id => id !== topicId);
      const newXP = prev.xp + xpReward;
      const newLevel = calculateLevel(newXP);

      showToast(`✨ Topic Completed! +${xpReward} XP earned!`, 'success');
      triggerConfetti();

      const intermediate = {
        ...prev,
        completedTopics: newCompleted,
        inProgressTopics: newInProgress,
        xp: newXP,
        level: newLevel
      };

      const { unlocked, xpBonus } = checkAchievements(intermediate);
      return {
        ...intermediate,
        xp: newXP + xpBonus,
        level: calculateLevel(newXP + xpBonus),
        achievements: unlocked
      };
    });
  }, [showToast, triggerConfetti, checkAchievements]);

  // Mark Topic In Progress
  const markTopicInProgress = useCallback((topicId: string) => {
    setProgress(prev => {
      if (prev.completedTopics.includes(topicId) || prev.inProgressTopics.includes(topicId)) return prev;
      return {
        ...prev,
        inProgressTopics: [...prev.inProgressTopics, topicId]
      };
    });
  }, []);

  // Mark Lesson Complete
  const markLessonComplete = useCallback((lessonId: string, topicId: string, xpReward = 25) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) {
        showToast('Lesson already completed!', 'info');
        return prev;
      }

      const newCompletedLessons = [...prev.completedLessons, lessonId];
      const newInProgress = prev.inProgressTopics.includes(topicId)
        ? prev.inProgressTopics
        : [...prev.inProgressTopics, topicId];

      const newXP = prev.xp + xpReward;
      const newLevel = calculateLevel(newXP);

      showToast(`✅ Lesson Complete! +${xpReward} XP`, 'success');

      const intermediate = {
        ...prev,
        completedLessons: newCompletedLessons,
        inProgressTopics: newInProgress,
        xp: newXP,
        level: newLevel
      };

      const { unlocked, xpBonus } = checkAchievements(intermediate);
      return {
        ...intermediate,
        xp: newXP + xpBonus,
        level: calculateLevel(newXP + xpBonus),
        achievements: unlocked
      };
    });
  }, [showToast, checkAchievements]);

  // Toggle Bookmark Topic
  const toggleBookmarkTopic = useCallback((topicId: string) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarkedTopics.includes(topicId);
      const newBookmarks = isBookmarked
        ? prev.bookmarkedTopics.filter(id => id !== topicId)
        : [...prev.bookmarkedTopics, topicId];

      showToast(isBookmarked ? 'Topic removed from bookmarks' : 'Topic saved to bookmarks', 'info');
      return { ...prev, bookmarkedTopics: newBookmarks };
    });
  }, [showToast]);

  // Toggle Bookmark Lesson
  const toggleBookmarkLesson = useCallback((lessonId: string) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarkedLessons.includes(lessonId);
      const newBookmarks = isBookmarked
        ? prev.bookmarkedLessons.filter(id => id !== lessonId)
        : [...prev.bookmarkedLessons, lessonId];

      showToast(isBookmarked ? 'Lesson removed from bookmarks' : 'Lesson saved to bookmarks', 'info');
      return { ...prev, bookmarkedLessons: newBookmarks };
    });
  }, [showToast]);

  // Toggle Bookmark Tech
  const toggleBookmarkTech = useCallback((techId: string) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarkedTech.includes(techId);
      const newBookmarks = isBookmarked
        ? prev.bookmarkedTech.filter(id => id !== techId)
        : [...prev.bookmarkedTech, techId];

      showToast(isBookmarked ? 'Technology removed from saved' : 'Technology saved to library', 'info');
      return { ...prev, bookmarkedTech: newBookmarks };
    });
  }, [showToast]);

  // Save Topic Note
  const saveTopicNote = useCallback((topicId: string, noteContent: string) => {
    setProgress(prev => {
      showToast('Note saved in local storage!', 'success');
      return {
        ...prev,
        notes: {
          ...prev.notes,
          [topicId]: noteContent
        }
      };
    });
  }, [showToast]);

  // Record Quiz Answer
  const recordQuizAnswer = useCallback((quizId: string, answeredIndex: number, isCorrect: boolean, xpReward = 30) => {
    setProgress(prev => {
      const existing = prev.quizAnswers[quizId];
      if (existing?.isCorrect) return prev; // Don't re-reward already correct quizzes

      const newXP = isCorrect ? prev.xp + xpReward : prev.xp;
      const newLevel = calculateLevel(newXP);

      const intermediate = {
        ...prev,
        xp: newXP,
        level: newLevel,
        quizAnswers: {
          ...prev.quizAnswers,
          [quizId]: { answeredIndex, isCorrect, timestamp: new Date().toISOString() }
        }
      };

      if (isCorrect) {
        showToast(`🎯 Correct Answer! +${xpReward} XP`, 'success');
        const { unlocked, xpBonus } = checkAchievements(intermediate);
        return {
          ...intermediate,
          xp: newXP + xpBonus,
          level: calculateLevel(newXP + xpBonus),
          achievements: unlocked
        };
      } else {
        showToast('Incorrect answer. Review the explanation and try again!', 'error');
        return intermediate;
      }
    });
  }, [showToast, checkAchievements]);

  // Set Learning Mode
  const setLearningMode = useCallback((mode: 'standard' | 'beginner' | 'pro') => {
    setProgress(prev => ({ ...prev, mode }));
    showToast(`Switched to ${mode.toUpperCase()} learning mode`, 'info');
  }, [showToast]);

  // Reset Progress
  const resetProgress = useCallback(() => {
    setProgress(INITIAL_STATE);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Progress and study data reset successfully', 'info');
  }, [showToast]);

  // Export JSON Backup
  const exportProgressJSON = useCallback((): string => {
    return JSON.stringify(progress, null, 2);
  }, [progress]);

  // Import JSON Backup
  const importProgressJSON = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed.xp === 'number') {
        setProgress(parsed);
        showToast('Backup restored successfully!', 'success');
        triggerConfetti();
        return true;
      }
    } catch (e) {
      showToast('Invalid backup JSON format', 'error');
    }
    return false;
  }, [showToast, triggerConfetti]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markTopicComplete,
        markTopicInProgress,
        markLessonComplete,
        toggleBookmarkTopic,
        toggleBookmarkLesson,
        toggleBookmarkTech,
        saveTopicNote,
        recordQuizAnswer,
        setLearningMode,
        addXP,
        resetProgress,
        exportProgressJSON,
        importProgressJSON,
        triggerConfetti
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
