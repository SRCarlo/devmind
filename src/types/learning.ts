import { SkillLevel, TopicCategory } from './mindmap';

export interface CodeExample {
  id: string;
  title: string;
  language: 'javascript' | 'typescript' | 'html' | 'css' | 'jsx' | 'tsx';
  initialCode: string;
  expectedOutput?: string;
  explanation?: string;
  editable?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  slug: string;
  summary: string;
  estimatedMinutes: number;
  xp: number;
  sections: Array<{
    title: string;
    content: string; // Markdown / styled paragraphs
    codeSnippet?: {
      code: string;
      language: string;
      caption?: string;
    };
    callout?: {
      type: 'tip' | 'warning' | 'info' | 'pro-tip';
      title: string;
      text: string;
    };
  }>;
  interactiveCode?: CodeExample;
  quiz?: QuizQuestion;
  challenge?: {
    task: string;
    starterCode: string;
    solutionCode: string;
    hints: string[];
  };
}

export interface Course {
  id: string;
  topicId: string;
  title: string;
  slug: string;
  description: string;
  category: TopicCategory;
  level: SkillLevel;
  iconName: string;
  color: string;
  estimatedHours: number;
  modules: Array<{
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
  }>;
}

export interface RoadmapStep {
  id: string;
  topicId: string;
  title: string;
  status?: string;
  description: string;
  estimatedDuration: string;
  milestone?: boolean;
  essentialSkills: string[];
}

export interface Roadmap {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  difficulty: SkillLevel;
  totalEstimatedWeeks: number;
  color: string;
  iconName: string;
  steps: RoadmapStep[];
  outcomes: string[];
}

export interface UserNote {
  topicId: string;
  lessonId?: string;
  content: string;
  updatedAt: string;
}
