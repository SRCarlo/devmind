import { Achievement } from '../types/progress';

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'ach-first-step',
    title: 'First Line of Code',
    description: 'Completed your very first lesson on DevMind.',
    icon: '🚀',
    category: 'learning',
    xpReward: 50,
    maxProgress: 1
  },
  {
    id: 'ach-closure-master',
    title: 'Closure Conqueror',
    description: 'Mastered JavaScript Closures and passed the assessment quiz.',
    icon: '⚡',
    category: 'mastery',
    xpReward: 100,
    maxProgress: 1
  },
  {
    id: 'ach-react-init',
    title: 'Component Craftsman',
    description: 'Finished the React Core & JSX module.',
    icon: '⚛️',
    category: 'mastery',
    xpReward: 150,
    maxProgress: 1
  },
  {
    id: 'ach-type-safety',
    title: 'Strict Type Warrior',
    description: 'Completed the TypeScript Foundations curriculum.',
    icon: '🛡️',
    category: 'mastery',
    xpReward: 200,
    maxProgress: 1
  },
  {
    id: 'ach-streak-3',
    title: 'Consistency Sparks',
    description: 'Maintained a 3-day active learning streak.',
    icon: '🔥',
    category: 'streak',
    xpReward: 75,
    maxProgress: 3
  },
  {
    id: 'ach-streak-7',
    title: 'Weekly Warrior',
    description: 'Maintained a 7-day uninterrupted learning streak.',
    icon: '🌟',
    category: 'streak',
    xpReward: 250,
    maxProgress: 7
  },
  {
    id: 'ach-topics-5',
    title: 'Knowledge Gatherer',
    description: 'Successfully completed 5 knowledge graph topics.',
    icon: '📚',
    category: 'learning',
    xpReward: 200,
    maxProgress: 5
  },
  {
    id: 'ach-topics-10',
    title: 'Frontend Explorer',
    description: 'Completed 10 knowledge graph topics across all tiers.',
    icon: '🧭',
    category: 'learning',
    xpReward: 500,
    maxProgress: 10
  },
  {
    id: 'ach-quiz-ace',
    title: 'Quiz Ace',
    description: 'Answered 5 interactive quizzes correctly on the first attempt.',
    icon: '🎯',
    category: 'special',
    xpReward: 180,
    maxProgress: 5
  },
  {
    id: 'ach-notes-scholar',
    title: 'Note-Taking Scholar',
    description: 'Saved your first personalized topic notes.',
    icon: '📝',
    category: 'special',
    xpReward: 60,
    maxProgress: 1
  },
  {
    id: 'ach-pro-mode',
    title: 'Architect Mindset',
    description: 'Explored Pro Mode architecture layers in the knowledge graph.',
    icon: '🏛️',
    category: 'special',
    xpReward: 120,
    maxProgress: 1
  },
  {
    id: 'ach-backend-aware',
    title: 'Fullstack Horizon',
    description: 'Mastered Backend Awareness & CORS Security.',
    icon: '🌐',
    category: 'mastery',
    xpReward: 250,
    maxProgress: 1
  }
];
