import { MindMapTopic, MindMapEdgeData } from '../types/mindmap';

export const MINDMAP_TOPICS: MindMapTopic[] = [
  // ================= Level 0: Foundations (Y: 60) =================
  {
    id: 'web-fundamentals',
    title: 'How the Web Works',
    slug: 'how-the-web-works',
    category: 'Fundamentals',
    level: 'beginner',
    levelNumber: 0,
    description: 'Clients, servers, HTTP/HTTPS, DNS, IP addresses, TCP/IP, and request-response cycles.',
    fullOverview: 'Understanding how the global Internet delivers web pages to browsers is the foundation of software engineering. Learn how DNS converts domain names to IP addresses, how TCP/IP transmits packets, and how client-server architectures interact.',
    iconName: 'SiGooglechrome',
    color: '#38BDF8',
    position: { x: 380, y: 60 },
    prerequisites: [],
    dependencies: ['html-basics', 'git-version-control', 'js-fundamentals', 'python-fundamentals'],
    estimatedHours: 4,
    lessonsCount: 4,
    xpReward: 120,
    tags: ['HTTP', 'DNS', 'Client-Server', 'Web Basics', 'Networking'],
    keyTakeaways: [
      'DNS acts as the phonebook of the Internet, resolving domain names to IP addresses',
      'HTTP/HTTPS is the protocol browsers use to request resources from servers',
      'Client devices render HTML, CSS, and JS received over TCP packets'
    ],
    interviewQuestions: [
      {
        question: 'What happens step-by-step when you type a URL into the browser and press Enter?',
        answer: 'The browser checks local and OS DNS caches, resolves IP via recursive DNS lookup, establishes TCP three-way handshake with TLS certificates for HTTPS, transmits an HTTP GET request, receives the initial HTML stream, parses tokens into DOM/CSSOM trees, downloads referenced JS/assets, and composites layout render frames.'
      }
    ]
  },
  {
    id: 'html-basics',
    title: 'HTML5 & Semantic Structure',
    slug: 'html-basics',
    category: 'HTML & CSS',
    level: 'beginner',
    levelNumber: 0,
    description: 'Document structure, semantic tags, forms, screen-reader accessibility (a11y), and SEO fundamentals.',
    fullOverview: 'HTML provides the structural skeleton of all web interfaces. Semantic HTML elements convey meaningful hierarchy to browsers, assistive screen readers, and search engine crawlers.',
    iconName: 'SiHtml5',
    color: '#E34F26',
    position: { x: 60, y: 60 },
    prerequisites: ['web-fundamentals'],
    dependencies: ['css-fundamentals'],
    estimatedHours: 6,
    lessonsCount: 5,
    xpReward: 150,
    tags: ['HTML5', 'Semantics', 'Forms', 'SEO', 'a11y'],
    keyTakeaways: [
      'Semantic tags like <main>, <article>, <nav>, and <section> clarify document outline',
      'Accessible forms require proper <label> associations and input validations'
    ],
    interviewQuestions: [
      {
        question: 'Why should you prefer semantic elements over generic <div> tags?',
        answer: 'Semantic elements communicate document structure to assistive screen readers, optimize search crawler indexing, and improve codebase maintainability.'
      }
    ]
  },
  {
    id: 'git-version-control',
    title: 'Git & GitHub Workflows',
    slug: 'git-version-control',
    category: 'Fundamentals',
    level: 'beginner',
    levelNumber: 0,
    description: 'Commits, branching strategies, merge conflicts, pull requests, and Git automation.',
    fullOverview: 'Git is the industry-standard distributed version control system. Learn repository initialization, atomic commits, branch isolation, cherry-picking, and GitHub collaboration.',
    iconName: 'SiGit',
    color: '#F05032',
    position: { x: 700, y: 60 },
    prerequisites: ['web-fundamentals'],
    dependencies: ['npm-tooling', 'python-fundamentals'],
    estimatedHours: 5,
    lessonsCount: 4,
    xpReward: 140,
    tags: ['Git', 'GitHub', 'Branching', 'Collaboration'],
    keyTakeaways: [
      'Git tracks repository snapshots across working directory, staging area, and commits',
      'Branching isolates new feature developments until peer reviewed in pull requests'
    ],
    interviewQuestions: [
      {
        question: 'What is the key difference between git merge and git rebase?',
        answer: 'Git merge preserves complete commit history with a dedicated merge commit, while rebase linearizes commits by reapplying local work on top of the target branch tip.'
      }
    ]
  },

  // ================= Level 1: Core Languages & Logic (Y: 260) =================
  {
    id: 'css-fundamentals',
    title: 'CSS3 & Modern Layouts',
    slug: 'css-fundamentals',
    category: 'HTML & CSS',
    level: 'beginner',
    levelNumber: 1,
    description: 'Box Model, Flexbox (1D), CSS Grid (2D), specificity, custom properties, and fluid typography.',
    fullOverview: 'Master Flexbox for 1D directional alignment, CSS Grid for complex 2D layouts, CSS custom properties (variables), media queries, and mobile-first responsive design.',
    iconName: 'SiCss',
    color: '#1572B6',
    position: { x: 60, y: 260 },
    prerequisites: ['html-basics'],
    dependencies: ['tailwind-css'],
    estimatedHours: 8,
    lessonsCount: 6,
    xpReward: 180,
    tags: ['CSS3', 'Flexbox', 'Grid', 'Box Model', 'Variables'],
    keyTakeaways: [
      'The CSS Box Model contains content, padding, border, and margin with box-sizing: border-box',
      'Flexbox manages alignment on 1 axis; Grid controls 2D rows and columns simultaneously'
    ],
    interviewQuestions: [
      {
        question: 'How does CSS specificity calculate which style wins?',
        answer: 'Specificity hierarchy is: Inline styles (1000) > IDs (100) > Classes/Attributes/Pseudo-classes (10) > Elements/Pseudo-elements (1). Specificity is compared positionally from highest to lowest rank.'
      }
    ]
  },
  {
    id: 'js-fundamentals',
    title: 'JavaScript Core & Logic',
    slug: 'javascript-fundamentals',
    category: 'JavaScript',
    level: 'beginner',
    levelNumber: 1,
    description: 'Data types, control flow, functions, arrays, objects, closures, prototypes, and ES6+ syntax.',
    fullOverview: 'JavaScript is the fundamental programming language of the modern web. Master execution contexts, closures, prototypes, destructuring, and declarative array pipelines.',
    iconName: 'SiJavascript',
    color: '#F7DF1E',
    position: { x: 380, y: 260 },
    prerequisites: ['web-fundamentals'],
    dependencies: ['js-async-promises', 'typescript-basics'],
    estimatedHours: 12,
    lessonsCount: 8,
    xpReward: 250,
    tags: ['JavaScript', 'ES6+', 'Closures', 'Functions', 'Prototypes'],
    keyTakeaways: [
      'Closures allow inner functions to remember variables from outer lexical scopes',
      'Declarative methods like map, filter, and reduce create predictable, pure data flows'
    ],
    interviewQuestions: [
      {
        question: 'What is a closure and why is it useful in practice?',
        answer: 'A closure is the combination of a function bundled with references to its surrounding lexical state. Closures enable data encapsulation (private state), function factories, and memoization.'
      }
    ]
  },
  {
    id: 'python-fundamentals',
    title: 'Python Core & Scripting',
    slug: 'python-fundamentals',
    category: 'Backend Awareness',
    level: 'beginner',
    levelNumber: 1,
    description: 'Syntax, data structures, list comprehensions, OOP, file handling, and virtual environments.',
    fullOverview: 'Python is a powerhouse for backend services, APIs, data manipulation, and automation. Learn Pythonic syntax, dictionaries, sets, decorators, and package management with pip and poetry.',
    iconName: 'FaPython',
    color: '#3776AB',
    position: { x: 700, y: 260 },
    prerequisites: ['web-fundamentals', 'git-version-control'],
    dependencies: ['java-fundamentals', 'backend-awareness'],
    estimatedHours: 10,
    lessonsCount: 6,
    xpReward: 220,
    tags: ['Python', 'OOP', 'Data Structures', 'Decorators', 'Scripting'],
    keyTakeaways: [
      'Python emphasizes clean, human-readable code through indentation and dynamic typing',
      'List comprehensions and generators provide memory-efficient iterations'
    ],
    interviewQuestions: [
      {
        question: 'What is the Global Interpreter Lock (GIL) in Python?',
        answer: 'The GIL is a mutex in CPython that prevents multiple native threads from executing Python bytecodes simultaneously. For CPU-bound concurrency, multiprocessing or process pools are preferred.'
      }
    ]
  },

  // ================= Level 2: Intermediate Developer (Y: 460) =================
  {
    id: 'tailwind-css',
    title: 'Tailwind CSS & Styling',
    slug: 'modern-styling-tailwind',
    category: 'HTML & CSS',
    level: 'intermediate',
    levelNumber: 2,
    description: 'Utility-first CSS, Tailwind CSS v4, design tokens, and theme customization.',
    fullOverview: 'Build high-performance, maintainable user interfaces using utility-first styling with design tokens and zero unused CSS.',
    iconName: 'SiTailwindcss',
    color: '#06B6D4',
    position: { x: 60, y: 460 },
    prerequisites: ['css-fundamentals'],
    dependencies: ['react-fundamentals'],
    estimatedHours: 8,
    lessonsCount: 5,
    xpReward: 190,
    tags: ['Tailwind CSS', 'Design Tokens', 'Utility Classes'],
    keyTakeaways: [
      'Utility-first CSS accelerates UI builds and produces minimal production CSS'
    ],
    interviewQuestions: [
      {
        question: 'What are design tokens and why are they standard in modern frontend systems?',
        answer: 'Design tokens are named entities that store visual design attributes (colors, spacing, typography scales) used in place of hardcoded values, ensuring UI consistency across web and mobile platforms.'
      }
    ]
  },
  {
    id: 'js-async-promises',
    title: 'Async JS & Event Loop',
    slug: 'async-javascript',
    category: 'JavaScript',
    level: 'intermediate',
    levelNumber: 2,
    description: 'Call stack, Event Loop, Microtasks, Promises, async/await, and Fetch API.',
    fullOverview: 'Master asynchronous execution in JavaScript, promise chaining, async/await error handling, and parallel fetching with Promise.allSettled.',
    iconName: 'SiJavascript',
    color: '#F59E0B',
    position: { x: 380, y: 460 },
    prerequisites: ['js-fundamentals'],
    dependencies: ['react-fundamentals', 'backend-awareness'],
    estimatedHours: 8,
    lessonsCount: 6,
    xpReward: 200,
    tags: ['Async', 'Promises', 'Fetch', 'Event Loop', 'Microtasks'],
    keyTakeaways: [
      'Promises represent eventual completion or failure of async tasks',
      'Microtasks (Promises) execute before macrotasks (setTimeout) in the event loop'
    ],
    interviewQuestions: [
      {
        question: 'How does the JavaScript Event Loop coordinate microtasks and macrotasks?',
        answer: 'When the call stack empties, the event loop drains the entire Microtask queue (Promise callbacks, queueMicrotask) before processing the next Macrotask (setTimeout, setInterval, I/O events).'
      }
    ]
  },
  {
    id: 'java-fundamentals',
    title: 'Java Core & Spring Boot',
    slug: 'java-core-springboot',
    category: 'Backend Awareness',
    level: 'intermediate',
    levelNumber: 2,
    description: 'Object-oriented programming, JVM architecture, Spring Boot 3 REST APIs, and JPA databases.',
    fullOverview: 'Learn enterprise software development with Java: class hierarchies, interfaces, generics, streams API, and building microservice REST APIs with Spring Boot.',
    iconName: 'FaJava',
    color: '#ED8B00',
    position: { x: 700, y: 460 },
    prerequisites: ['python-fundamentals'],
    dependencies: ['backend-awareness', 'frontend-architecture'],
    estimatedHours: 14,
    lessonsCount: 7,
    xpReward: 300,
    tags: ['Java', 'Spring Boot', 'JVM', 'REST APIs', 'JPA'],
    keyTakeaways: [
      'Java bytecode executes on the JVM, providing cross-platform portability and automatic memory management',
      'Spring Boot delivers dependency injection and auto-configuration for robust REST services'
    ],
    interviewQuestions: [
      {
        question: 'What is Inversion of Control (IoC) and Dependency Injection in Spring Boot?',
        answer: 'IoC delegates object creation and lifecycle management to the Spring container. Dependency Injection is the pattern where dependencies are injected into classes via constructors rather than manually instantiated.'
      }
    ]
  },

  // ================= Level 3: Advanced Frontend & Types (Y: 660) =================
  {
    id: 'react-fundamentals',
    title: 'React 19 & Components',
    slug: 'react-fundamentals',
    category: 'React',
    level: 'intermediate',
    levelNumber: 3,
    description: 'Components, JSX, Props, State, Virtual DOM reconciliation, and unidirectional data flow.',
    fullOverview: 'Build modular, interactive user interfaces with declarative component trees and unidirectional data flow.',
    iconName: 'FaReact',
    color: '#61DAFB',
    position: { x: 60, y: 660 },
    prerequisites: ['js-async-promises', 'tailwind-css'],
    dependencies: ['react-hooks'],
    estimatedHours: 14,
    lessonsCount: 8,
    xpReward: 300,
    tags: ['React', 'Components', 'JSX', 'Props', 'State'],
    keyTakeaways: [
      'Components are pure functions mapping state and props to virtual DOM UI elements',
      'Unidirectional data flow ensures state mutations remain predictable and debuggable'
    ],
    interviewQuestions: [
      {
        question: 'How does React Virtual DOM reconciliation work?',
        answer: 'React diffs new Virtual DOM trees against previous fiber snapshots using heuristic O(n) algorithms, grouping and batching real DOM writes efficiently.'
      }
    ]
  },
  {
    id: 'react-hooks',
    title: 'React Hooks & State',
    slug: 'react-hooks',
    category: 'React',
    level: 'intermediate',
    levelNumber: 3,
    description: 'useState, useEffect, useRef, useMemo, useCallback, and custom reusable hook abstractions.',
    fullOverview: 'Master reactive state updates, side-effect lifecycles, and custom reusable hook abstractions.',
    iconName: 'FaReact',
    color: '#38BDF8',
    position: { x: 380, y: 660 },
    prerequisites: ['react-fundamentals'],
    dependencies: ['frontend-architecture'],
    estimatedHours: 10,
    lessonsCount: 6,
    xpReward: 240,
    tags: ['Hooks', 'useState', 'useEffect', 'Custom Hooks', 'Performance'],
    keyTakeaways: [
      'useEffect handles external synchronizations and subscriptions with cleanup teardowns',
      'Custom hooks encapsulate reusable stateful business logic without component wrapper hell'
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between useMemo and useCallback?',
        answer: 'useMemo caches and returns the computed result of an expensive calculation; useCallback caches and returns a stable function reference between renders.'
      }
    ]
  },
  {
    id: 'typescript-basics',
    title: 'TypeScript Foundations',
    slug: 'typescript-foundations',
    category: 'TypeScript',
    level: 'intermediate',
    levelNumber: 3,
    description: 'Static typing, interfaces, type aliases, union types, and generics.',
    fullOverview: 'TypeScript adds compile-time static type safety to JavaScript, catching bugs before runtime and powering great autocompletion.',
    iconName: 'SiTypescript',
    color: '#3178C6',
    position: { x: 700, y: 660 },
    prerequisites: ['js-fundamentals'],
    dependencies: ['testing-fundamentals', 'frontend-architecture'],
    estimatedHours: 10,
    lessonsCount: 7,
    xpReward: 260,
    tags: ['TypeScript', 'Generics', 'Interfaces', 'Type Safety'],
    keyTakeaways: [
      'Static types eliminate undefined/null errors during development',
      'Interfaces and Generics allow scalable, reusable type abstractions'
    ],
    interviewQuestions: [
      {
        question: 'What is the difference between Type and Interface in TypeScript?',
        answer: 'Interfaces define extensible object shapes supporting declaration merging; Types can model unions, primitives, tuples, and mapped types.'
      }
    ]
  },

  // ================= Level 4: Professional & Architecture (Y: 860) =================
  {
    id: 'backend-awareness',
    title: 'SQL, Databases & APIs',
    slug: 'backend-awareness-for-frontend',
    category: 'Backend Awareness',
    level: 'advanced',
    levelNumber: 4,
    description: 'PostgreSQL, SQL queries, REST, GraphQL, CORS, JWT tokens, and OAuth2 security.',
    fullOverview: 'Understand full-stack communication: relational SQL databases, indexing, CORS policies, HttpOnly cookies, and API contracts.',
    iconName: 'SiPostgresql',
    color: '#336791',
    position: { x: 60, y: 860 },
    prerequisites: ['python-fundamentals', 'java-fundamentals'],
    dependencies: ['frontend-architecture'],
    estimatedHours: 12,
    lessonsCount: 6,
    xpReward: 290,
    tags: ['PostgreSQL', 'SQL', 'REST', 'GraphQL', 'Auth', 'CORS'],
    keyTakeaways: [
      'HttpOnly cookies protect authentication tokens from XSS theft',
      'Relational database indexes speed up query lookups from O(N) full table scans to O(log N) B-Tree operations'
    ],
    interviewQuestions: [
      {
        question: 'Why use HttpOnly cookies for JWT authentication tokens instead of localStorage?',
        answer: 'HttpOnly cookies cannot be read or exfiltrated by client-side JavaScript, effectively neutralizing token theft through Cross-Site Scripting (XSS).'
      }
    ]
  },
  {
    id: 'frontend-architecture',
    title: 'System Design & Scalability',
    slug: 'frontend-system-design',
    category: 'Architecture',
    level: 'professional',
    levelNumber: 4,
    description: 'Clean Architecture, monorepos, caching strategies, microfrontends, and performance optimization.',
    fullOverview: 'Architect modular codebases, decouple domain logic from UI presentation, implement client-side caching, and optimize Core Web Vitals.',
    iconName: 'SiNextdotjs',
    color: '#A855F7',
    position: { x: 380, y: 860 },
    prerequisites: ['react-hooks', 'typescript-basics', 'backend-awareness'],
    dependencies: ['modern-react-19'],
    estimatedHours: 16,
    lessonsCount: 7,
    xpReward: 400,
    tags: ['Architecture', 'System Design', 'Clean Code', 'Web Vitals'],
    keyTakeaways: [
      'Separate presentation layers, state machines, and data access adapters for maintainability'
    ],
    interviewQuestions: [
      {
        question: 'How do you optimize Core Web Vitals (LCP, INP, CLS) in a modern web application?',
        answer: 'Optimize LCP by preloading hero assets and streaming SSR; optimize INP by offloading heavy scripts to Web Workers and using useTransition; optimize CLS by enforcing aspect-ratio dimensions on images and dynamic containers.'
      }
    ]
  },
  {
    id: 'modern-react-19',
    title: 'Modern React 19 & Next.js',
    slug: 'modern-react-19-server-components',
    category: 'Modern Web',
    level: 'professional',
    levelNumber: 4,
    description: 'React Server Components (RSC), Server Actions, Next.js App Router, and Compiler optimization.',
    fullOverview: 'Explore modern fullstack React patterns: React Server Components that zero out client bundles, server mutations with actions, and automatic compiler memoization.',
    iconName: 'FaReact',
    color: '#06B6D4',
    position: { x: 700, y: 860 },
    prerequisites: ['frontend-architecture'],
    dependencies: [],
    estimatedHours: 14,
    lessonsCount: 6,
    xpReward: 380,
    tags: ['React 19', 'Next.js 15', 'RSC', 'Server Actions'],
    keyTakeaways: [
      'React Server Components run exclusively on the server, sending zero JavaScript to client bundles'
    ],
    interviewQuestions: [
      {
        question: 'What problem do React Server Components (RSC) solve compared to standard client components?',
        answer: 'RSCs execute solely on the server to query databases and render markup without including component code or dependencies in client JavaScript bundle downloads.'
      }
    ]
  }
];

export const MINDMAP_EDGES: MindMapEdgeData[] = [
  // Level 0 -> Level 1 (Vertical & Direct)
  { id: 'e-web-html', source: 'web-fundamentals', target: 'html-basics' },
  { id: 'e-web-js', source: 'web-fundamentals', target: 'js-fundamentals' },
  { id: 'e-web-py', source: 'web-fundamentals', target: 'python-fundamentals' },
  { id: 'e-web-git', source: 'web-fundamentals', target: 'git-version-control' },

  // Level 1 -> Level 2
  { id: 'e-html-css', source: 'html-basics', target: 'css-fundamentals' },
  { id: 'e-css-tailwind', source: 'css-fundamentals', target: 'tailwind-css' },
  { id: 'e-js-async', source: 'js-fundamentals', target: 'js-async-promises' },
  { id: 'e-py-java', source: 'python-fundamentals', target: 'java-fundamentals' },

  // Level 2 -> Level 3
  { id: 'e-tailwind-react', source: 'tailwind-css', target: 'react-fundamentals' },
  { id: 'e-async-react', source: 'js-async-promises', target: 'react-fundamentals' },
  { id: 'e-react-hooks', source: 'react-fundamentals', target: 'react-hooks' },
  { id: 'e-js-ts', source: 'js-fundamentals', target: 'typescript-basics' },

  // Level 3 -> Level 4
  { id: 'e-java-backend', source: 'java-fundamentals', target: 'backend-awareness' },
  { id: 'e-hooks-arch', source: 'react-hooks', target: 'frontend-architecture' },
  { id: 'e-ts-arch', source: 'typescript-basics', target: 'frontend-architecture' },
  { id: 'e-backend-arch', source: 'backend-awareness', target: 'frontend-architecture' },
  { id: 'e-arch-react19', source: 'frontend-architecture', target: 'modern-react-19' }
];
