export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'professional';

export type NodeStatus = 'locked' | 'available' | 'in-progress' | 'completed' | 'mastered';

export type TopicCategory = 
  | 'Fundamentals'
  | 'HTML & CSS'
  | 'JavaScript'
  | 'TypeScript'
  | 'React'
  | 'State Management'
  | 'Build Tools'
  | 'Testing'
  | 'Backend Awareness'
  | 'DevOps'
  | 'Architecture'
  | 'Modern Web';

export interface MindMapTopic {
  id: string;
  title: string;
  slug: string;
  category: TopicCategory;
  level: SkillLevel;
  levelNumber: number; // 0, 1, 2, 3, 4
  description: string;
  fullOverview: string;
  iconName: string;
  color: string;
  position: { x: number; y: number };
  prerequisites: string[]; // topic IDs
  dependencies: string[]; // child topic IDs
  estimatedHours: number;
  lessonsCount: number;
  xpReward: number;
  tags: string[];
  keyTakeaways: string[];
  interviewQuestions: Array<{
    question: string;
    answer: string;
  }>;
}

export interface MindMapEdgeData {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  label?: string;
}

export interface FilterState {
  search: string;
  level: SkillLevel | 'all';
  category: TopicCategory | 'all';
  status: 'all' | 'in-progress' | 'completed' | 'locked' | 'bookmarked';
  mode: 'standard' | 'beginner' | 'pro';
}
