import { Roadmap } from '../types/learning';

export const ROADMAPS_DATA: Roadmap[] = [
  {
    id: 'roadmap-frontend-core',
    title: 'Frontend Developer Path',
    slug: 'frontend-developer',
    tagline: 'From zero coding experience to building modern, production-grade web applications.',
    description: 'A comprehensive, end-to-end curriculum covering web fundamentals, responsive CSS, JavaScript ES6+, TypeScript, React, state management, and modern build tooling.',
    difficulty: 'beginner',
    totalEstimatedWeeks: 16,
    color: '#6366F1',
    iconName: 'FaReact',
    outcomes: [
      'Build responsive, accessible multi-page web applications',
      'Master JavaScript ES6+ logic and asynchronous promise handling',
      'Design modular component hierarchies with React and TypeScript',
      'Deploy applications to production with modern CI/CD pipelines'
    ],
    steps: [
      {
        id: 'step-1',
        topicId: 'web-fundamentals',
        title: 'Internet & Web Fundamentals',
        description: 'Understand how DNS, HTTP/HTTPS, clients, and web servers interact across networks.',
        estimatedDuration: '1 week',
        essentialSkills: ['HTTP Methods', 'DNS resolution', 'Browser rendering cycle']
      },
      {
        id: 'step-2',
        topicId: 'html-basics',
        title: 'Semantic HTML & Accessibility',
        description: 'Create structured, accessible documents using HTML5 semantic elements and ARIA roles.',
        estimatedDuration: '1 week',
        essentialSkills: ['Semantic tags', 'Accessible Forms', 'SEO meta headers']
      },
      {
        id: 'step-3',
        topicId: 'css-fundamentals',
        title: 'Modern CSS, Flexbox & Grid',
        description: 'Master the box model, responsive layouts, CSS Grid, Flexbox, and CSS Custom Properties.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['Flexbox', 'CSS Grid', 'Media Queries', 'CSS Variables']
      },
      {
        id: 'step-4',
        topicId: 'git-version-control',
        title: 'Git & Version Control',
        description: 'Manage code versions, collaborate on GitHub, resolve merge conflicts, and follow PR workflows.',
        estimatedDuration: '1 week',
        essentialSkills: ['Git commits', 'Feature branches', 'Pull requests']
      },
      {
        id: 'step-5',
        topicId: 'js-fundamentals',
        title: 'JavaScript Core & Logic',
        description: 'Deep dive into data types, functions, closures, prototypes, and ES6+ features.',
        estimatedDuration: '3 weeks',
        milestone: true,
        essentialSkills: ['Closures', 'Array methods', 'Destructuring', 'Scope']
      },
      {
        id: 'step-6',
        topicId: 'js-async-promises',
        title: 'Asynchronous JavaScript & Fetch API',
        description: 'Handle network requests, promises, async/await, and understand the single-threaded Event Loop.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['Promises', 'async/await', 'Fetch API', 'Event Loop']
      },
      {
        id: 'step-7',
        topicId: 'typescript-basics',
        title: 'TypeScript Type Safety',
        description: 'Add static typing, interfaces, union types, and generics to eliminate runtime bugs.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['Interfaces', 'Generics', 'Type Narrowing', 'Union types']
      },
      {
        id: 'step-8',
        topicId: 'react-fundamentals',
        title: 'React Components & State',
        description: 'Build interactive user interfaces with components, props, hooks, and virtual DOM reconciliations.',
        estimatedDuration: '3 weeks',
        milestone: true,
        essentialSkills: ['Components & JSX', 'useState & useEffect', 'Custom Hooks']
      },
      {
        id: 'step-9',
        topicId: 'tailwind-css',
        title: 'Modern Styling & Tailwind CSS',
        description: 'Rapidly craft beautiful, responsive UIs with utility-first CSS and design systems.',
        estimatedDuration: '1 week',
        essentialSkills: ['Utility classes', 'Design tokens', 'Responsive breakpoints']
      }
    ]
  },
  {
    id: 'roadmap-react-specialist',
    title: 'React Specialist & Ecosystem',
    slug: 'react-specialist',
    tagline: 'Deepen your mastery of React, modern state stores, performance optimization, and Next.js.',
    description: 'Focus exclusively on mastering the React ecosystem: custom hook patterns, Zustand, TanStack Query, rendering architecture, and React 19 concurrent features.',
    difficulty: 'intermediate',
    totalEstimatedWeeks: 12,
    color: '#06B6D4',
    iconName: 'FaReact',
    outcomes: [
      'Architect robust state management flows separating server cache from client state',
      'Diagnose and eliminate render bottlenecks using React Profiler',
      'Build custom reusable hooks with strict TypeScript safety',
      'Adopt React 19 Server Components and actions'
    ],
    steps: [
      {
        id: 'react-step-1',
        topicId: 'react-fundamentals',
        title: 'React Core Mechanics',
        description: 'Component lifecycles, reconciliation, and virtual DOM diffing.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['Component lifecycle', 'Virtual DOM', 'Reconciliation']
      },
      {
        id: 'react-step-2',
        topicId: 'react-hooks',
        title: 'Advanced Hooks & Memory Profiling',
        description: 'useMemo, useCallback, useRef, useImperativeHandle, and custom hooks.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['Dependency arrays', 'useMemo/useCallback', 'Custom hooks']
      },
      {
        id: 'react-step-3',
        topicId: 'state-management',
        title: 'State Architecture: Zustand & TanStack Query',
        description: 'Modern state separation: global client stores vs asynchronous server caches.',
        estimatedDuration: '2 weeks',
        milestone: true,
        essentialSkills: ['Zustand stores', 'Query invalidation', 'Optimistic UI']
      },
      {
        id: 'react-step-4',
        topicId: 'testing-fundamentals',
        title: 'Component & Integration Testing',
        description: 'Unit and integration testing with Vitest and React Testing Library.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['RTL queries', 'User events', 'API mocking with MSW']
      },
      {
        id: 'react-step-5',
        topicId: 'react-performance',
        title: 'React Rendering Optimization',
        description: 'Profiling, virtualization of massive lists, and bundle code splitting.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['React Profiler', 'Virtual lists', 'Lazy & Suspense']
      },
      {
        id: 'react-step-6',
        topicId: 'modern-react-19',
        title: 'React 19 & Next.js Ecosystem',
        description: 'Server Components (RSC), Server Actions, and the React Compiler.',
        estimatedDuration: '2 weeks',
        milestone: true,
        essentialSkills: ['Server Components', 'Server Actions', 'useTransition']
      }
    ]
  },
  {
    id: 'roadmap-frontend-architect',
    title: 'Frontend Architect & System Design',
    slug: 'frontend-architect',
    tagline: 'Design enterprise-scale web architectures, monorepos, micro-frontends, and performance budgets.',
    description: 'Learn the architectural principles required for senior and staff frontend engineers: clean layered boundaries, design system governance, performance engineering, and DevOps pipelines.',
    difficulty: 'professional',
    totalEstimatedWeeks: 14,
    color: '#8B5CF6',
    iconName: 'SiNextdotjs',
    outcomes: [
      'Architect scalable frontend architectures supporting multi-team repositories',
      'Optimize Core Web Vitals (LCP, INP, CLS) to the top 95th percentile',
      'Establish robust CI/CD pipelines with automated visual regression and E2E suites',
      'Implement enterprise client telemetry, crash reporting, and observability'
    ],
    steps: [
      {
        id: 'arch-step-1',
        topicId: 'advanced-typescript',
        title: 'Type-Level System Architecture',
        description: 'Conditional types, mapped types, and zero-runtime type validators with Zod.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['Conditional types', 'Infer keyword', 'Type-safe contracts']
      },
      {
        id: 'arch-step-2',
        topicId: 'frontend-architecture',
        title: 'Layered Frontend System Design',
        description: 'Domain-driven design, presentation adapters, and state machines.',
        estimatedDuration: '3 weeks',
        milestone: true,
        essentialSkills: ['Clean Architecture', 'Monorepos', 'Boundary decoupling']
      },
      {
        id: 'arch-step-3',
        topicId: 'backend-awareness',
        title: 'Fullstack Protocols & Security',
        description: 'HTTP/2, HTTP/3, WebSockets, gRPC-web, OAuth2, HttpOnly sessions, and CORS security.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['Protocol efficiency', 'Auth security', 'Database index awareness']
      },
      {
        id: 'arch-step-4',
        topicId: 'web-performance-core',
        title: 'Core Web Vitals & Performance Engineering',
        description: 'Master INP scheduling, critical rendering path tuning, and edge CDN routing.',
        estimatedDuration: '3 weeks',
        milestone: true,
        essentialSkills: ['INP optimization', 'Scheduler API', 'Critical CSS & Fonts']
      },
      {
        id: 'arch-step-5',
        topicId: 'devops-ci-cd',
        title: 'CI/CD Pipelines & Cloud Infrastructure',
        description: 'Docker multi-stage builds, GitHub Actions workflows, and edge serverless deployments.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['GitHub Actions', 'Docker optimization', 'Preview deployments']
      },
      {
        id: 'arch-step-6',
        topicId: 'e2e-testing',
        title: 'Automated E2E Testing & Quality Gates',
        description: 'Playwright test automation, synthetic user journey tests, and visual regression.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['Playwright fixtures', 'Page Objects', 'CI flaky test prevention']
      }
    ]
  },
  {
    id: 'roadmap-javascript-mastery',
    title: 'JavaScript Deep Dive & Internals',
    slug: 'javascript-mastery',
    tagline: 'Understand the V8 engine, memory allocation, microtask queues, and ESNext features.',
    description: 'Go beneath the surface of JavaScript: the V8 engine, garbage collection, prototype inheritance, event loop phases, and high-performance algorithms.',
    difficulty: 'intermediate',
    totalEstimatedWeeks: 10,
    color: '#EAB308',
    iconName: 'SiJavascript',
    outcomes: [
      'Understand how JavaScript engines parse, JIT compile, and execute code',
      'Diagnose memory leaks and manage garbage collection patterns',
      'Master asynchronous microtasks and Web Workers multi-threading'
    ],
    steps: [
      {
        id: 'js-deep-1',
        topicId: 'js-fundamentals',
        title: 'Lexical Scope & Execution Contexts',
        description: 'Call stacks, variable environments, and closure scope chains.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['Call Stack', 'Variable Environments', 'Closures']
      },
      {
        id: 'js-deep-2',
        topicId: 'js-async-promises',
        title: 'Event Loop & Task Queues Deep Dive',
        description: 'Microtasks vs Macrotasks, requestAnimationFrame, and async iterators.',
        estimatedDuration: '3 weeks',
        milestone: true,
        essentialSkills: ['Microtasks', 'Macrotasks', 'Async Generators']
      },
      {
        id: 'js-deep-3',
        topicId: 'typescript-basics',
        title: 'Static Typing Transformation',
        description: 'Compiling typed codebases into optimized JavaScript runtime targets.',
        estimatedDuration: '2 weeks',
        essentialSkills: ['Compiler options', 'Declaration files', 'TS runtime overhead']
      },
      {
        id: 'js-deep-4',
        topicId: 'npm-tooling',
        title: 'Module Systems (ESM vs CJS) & Bundling',
        description: 'Tree shaking, static analysis, circular dependencies, and ESM interoperability.',
        estimatedDuration: '3 weeks',
        milestone: true,
        essentialSkills: ['ESM vs CommonJS', 'Tree shaking', 'Module resolution']
      }
    ]
  }
];
