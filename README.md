# DevMind / CodeMind — Premium Interactive Developer Learning Platform

DevMind is a production-grade, frontend-only interactive software engineering learning platform. It visualizes developer education through an interactive visual knowledge graph, curated career roadmaps, simulated sandbox playgrounds, interactive quizzes, gamified progression (XP, levels, study streaks), and an intelligent context-aware AI copilot.

---

## 🌟 Key Features

### 1. Interactive Knowledge Graph Canvas (`/mindmap`)
- **XYFlow Engine (`@xyflow/react`)**: Smooth panning, zooming, minimap, grid background, and node dragging.
- **Rich Custom Nodes**: Visual indicators for difficulty tiers (Level 0: Absolute Beginner to Level 4: Professional & Architect), technology icons, lesson counts, completion percentages, glowing aura on active/mastered states, and muted locked states.
- **Node Details Slide-In Drawer**:
  - Deep-dive topic overview & mastery goals checklist
  - Prerequisites validation
  - Structured curriculum module & lesson viewer
  - Built-in personal notebook (persisted in `localStorage`)
  - Senior developer interview prep questions & answers
  - Context-aware AI Copilot launcher
- **Controls & Filtering**:
  - Filter by Domain (Fundamentals, HTML & CSS, JavaScript, TypeScript, React, State Management, Build Tools, Testing, Backend Awareness, DevOps, Architecture)
  - Filter by Level (Beginner, Intermediate, Advanced, Professional)
  - Filter by Status (All, In Progress, Completed, Locked, Bookmarked)
  - Progressive disclosure: **Beginner Mode**, **Standard Mode**, and **Pro Architect Mode**.
- **Mobile Responsive Vertical Tree**: Seamless fallback for tablet/mobile screen sizes.

### 2. Live Interactive Courses & Lesson Runner (`/learn/:topicId/:lessonId`)
- **Documentation-Grade Reading Layout**: Module syllabus sidebar with auto-active step tracker.
- **Simulated Interactive Code Playground**: Safe in-browser JavaScript/TypeScript evaluation engine with customizable console logs and output viewers.
- **Knowledge Check Quizzes**: Interactive multiple-choice quizzes with real-time answer verification, detailed technical explanations, XP rewards, and celebratory confetti animations.
- **Personal Notes Editor**: Integrated per topic and synced locally.

### 3. Developer Career Roadmaps (`/roadmaps`)
- **Curated Career Tracks**:
  - Frontend Developer Path (Beginner to Pro)
  - React Specialist & Ecosystem Master
  - Frontend Architect & System Design
  - JavaScript Deep Dive & Internals
- **Milestone Tree**: Step-by-step progress tracking with time commitments and essential skill tags.

### 4. Technology Ecosystem Explorer (`/technologies`)
- Catalog of 24+ core frontend and full-stack technologies (React, TypeScript, Next.js, Vite, Tailwind CSS, Docker, PostgreSQL, GraphQL, Vitest, Zustand, etc.).
- Direct official documentation links, popularity indices, ecosystem roles, and bookmarking.

### 5. Gamification & Mastery Center (`/progress`)
- **XP Progression & Level Engine**: Real-time XP tracking and automated level-ups.
- **28-Day Activity Heatmap**: Visual streak consistency tracker.
- **Milestone Achievements**: Unlockable badges (e.g. *First Line of Code*, *Closure Conqueror*, *Strict Type Warrior*, *Component Craftsman*, *Architect Mindset*).
- **Data Portability**: Full JSON export, backup import, and local reset controls.

### 6. Global Command Palette (`⌘K` / `Ctrl+K`)
- Fuzzy search across all topics, courses, lessons, roadmaps, and technologies.
- Keyboard navigation (arrow keys, Enter, Esc).

### 7. DevMind AI Copilot (Mock Context-Aware Assistant)
- Ask questions directly about the active topic or lesson.
- Pre-built quick prompt accelerators (*"Explain like I'm a beginner"*, *"Common interview questions"*, *"Practical code example"*, *"Common pitfalls to avoid"*).

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism UI tokens + CSS Variables
- **Graph Engine**: `@xyflow/react` (React Flow)
- **Animation System**: `framer-motion`
- **Iconography**: `react-icons` (SimpleIcons, FontAwesome, Lucide, Feather)
- **Routing**: `react-router-dom`
- **Celebrations**: `canvas-confetti`
- **Storage**: Client-Side `localStorage` with JSON import/export

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (or Node.js 20+)
- npm or pnpm

### Installation

```bash
# 1. Clone or open repository
cd Fun

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open your browser at `http://127.0.0.1:5173/` or `http://localhost:5173/`.

### Production Build

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 📂 Project Architecture

```
src/
├── app/
│   ├── App.tsx                     # Top-level application with providers
│   ├── routes.tsx                  # React Router configuration
│   └── providers/
│       ├── ThemeProvider.tsx        # Dark / Light / System theme manager
│       ├── ProgressProvider.tsx     # Gamification, XP, streak, and local state
│       └── ToastProvider.tsx        # Notification toast manager
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx            # Main layout wrapper
│   │   ├── Navbar.tsx              # Brand, quick stats, search trigger, theme
│   │   └── Sidebar.tsx             # Persistent navigation sidebar
│   ├── mindmap/
│   │   ├── MindMapCanvas.tsx       # XYFlow knowledge graph canvas
│   │   ├── MindMapNode.tsx         # Custom interactive graph node
│   │   ├── MindMapControls.tsx     # Filter and search controls
│   │   ├── MindMapMobileTree.tsx   # Mobile vertical tree view
│   │   └── NodeDetailsDrawer.tsx   # Topic deep-dive drawer panel
│   ├── dashboard/
│   │   ├── HeroBanner.tsx          # Main greeting and mastery gauge
│   │   ├── StatsOverview.tsx       # Streak, XP, completed metrics
│   │   ├── SkillBreakdown.tsx      # Domain progress breakdown
│   │   └── RecommendedTracks.tsx   # Smart next-step recommendations
│   ├── learning/
│   │   ├── CodePlayground.tsx      # Safe client-side code runner
│   │   ├── QuizComponent.tsx       # Interactive assessment widget
│   │   ├── LessonViewer.tsx        # Comprehensive lesson reading layout
│   │   └── NotesEditor.tsx         # Topic notes notebook editor
│   ├── search/
│   │   └── CommandPalette.tsx      # Fuzzy command palette (Ctrl+K)
│   ├── ai/
│   │   └── AIAssistantDrawer.tsx   # Contextual AI assistant simulator
│   └── ui/
│       ├── Button.tsx              # Motion buttons
│       ├── Badge.tsx               # Status & level badges
│       ├── Card.tsx                # Glassmorphic cards
│       ├── Modal.tsx               # Backdrop blur modals
│       ├── ProgressBar.tsx         # Linear and circular progress
│       └── Tabs.tsx                # Animated tab selector
│
├── data/
│   ├── mindmapData.ts              # Knowledge graph nodes and edges (L0-L4)
│   ├── coursesData.ts              # Detailed curriculum, lessons & quizzes
│   ├── roadmapsData.ts             # Curated career milestones
│   ├── technologiesData.ts         # 24+ tech directory items
│   ├── achievementsData.ts         # Unlockable achievements matrix
│   └── mockAIResponses.ts          # AI response generator
│
└── utils/
    └── iconMap.tsx                 # Dynamic SVG technology icon resolver
```

---

## 💡 How to Extend the Platform

### Adding a New Technology
1. Open `src/data/technologiesData.ts`.
2. Add a new `TechnologyItem` object with `id`, `name`, `tagline`, `category`, `level`, `popularityScore`, and `documentationUrl`.

### Adding a New Roadmap
1. Open `src/data/roadmapsData.ts`.
2. Add a new `Roadmap` entry with `steps`, each referencing the `topicId` in `mindmapData.ts`.

### Adding a New Course & Lessons
1. Open `src/data/coursesData.ts`.
2. Add a new `Course` with `modules` and `lessons`. Include `interactiveCode` and `quiz` objects to provide immediate hands-on practice.

---

## 🔒 Privacy & Offline First

All study state, quiz responses, bookmarks, streak dates, and personal notes are kept strictly inside the browser's `localStorage`. You can export your progress anytime using the **Export JSON Backup** button in `/progress` or `/settings`.
