import { SkillLevel, TopicCategory } from './mindmap';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'mastery' | 'special';
  xpReward: number;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface UserProgressState {
  completedTopics: string[]; // topic IDs
  inProgressTopics: string[]; // topic IDs
  completedLessons: string[]; // lesson IDs
  bookmarkedTopics: string[];
  bookmarkedLessons: string[];
  bookmarkedTech: string[];
  
  // Gamification
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  streakHistory: string[]; // YYYY-MM-DD
  achievements: string[]; // achievement IDs
  
  // Quiz scores
  quizAnswers: Record<string, { answeredIndex: number; isCorrect: boolean; timestamp: string }>;
  
  // Custom Notes
  notes: Record<string, string>; // topicId -> note markdown
  
  // Preferences
  mode: 'standard' | 'beginner' | 'pro';
  theme: 'dark' | 'light' | 'system';
}

export interface TechnologyItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: TopicCategory;
  level: SkillLevel;
  iconName: string;
  color: string;
  popularityScore: number; // 1-100
  ecosystemRole: string;
  description: string;
  documentationUrl: string;
  keyFeatures: string[];
  relatedTopicId?: string;
}
