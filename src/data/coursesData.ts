import { Course } from '../types/learning';

export const COURSES_DATA: Course[] = [
  // ================= 1. Web Fundamentals =================
  {
    id: 'course-web-fundamentals',
    topicId: 'web-fundamentals',
    title: 'How the Web Works & Networking',
    slug: 'how-the-web-works',
    category: 'Fundamentals',
    level: 'beginner',
    iconName: 'SiGooglechrome',
    color: '#38BDF8',
    description: 'Master DNS resolution, TCP/IP handshakes, HTTP/1.1 vs HTTP/2 vs HTTP/3, browser DOM parsing, and client-server architectures.',
    estimatedHours: 8,
    modules: [
      {
        id: 'mod-web-1',
        title: 'Module 1: DNS, IP & TCP Handshakes',
        description: 'Understand how clients discover and connect to servers across global networks.',
        lessons: [
          {
            id: 'lesson-web-dns-http',
            topicId: 'web-fundamentals',
            title: 'DNS Resolution & The 3-Way Handshake',
            slug: 'dns-resolution-and-http',
            estimatedMinutes: 15,
            xp: 25,
            summary: 'Explore what happens step-by-step when a user queries a URL, from recursive DNS to TCP SYN-ACK.',
            sections: [
              {
                title: 'The Journey of a Web Request',
                content: `When you enter \`https://devmind.app\` into a browser:
1. **DNS Lookup**: The browser checks memory cache, OS cache, and recursive resolvers to convert the domain name into an IP address (e.g. \`104.21.45.12\`).
2. **TCP 3-Way Handshake**: The client sends a \`SYN\` packet, receives a \`SYN-ACK\`, and acknowledges with an \`ACK\` to establish a stateful connection.
3. **TLS Cryptographic Handshake**: For HTTPS, certificates are exchanged to establish AES/ChaCha20 encryption.
4. **HTTP GET Request**: The client requests the root resource \`/\`.
5. **Server Response**: The server streams back status code 200 and the HTML payload.`,
                codeSnippet: {
                  language: 'javascript',
                  code: `// Simulating DNS & TCP connection pipeline
async function resolveAndConnect(domain) {
  console.log("1. Querying Recursive DNS for:", domain);
  const ip = "104.21.45.12"; // Simulated resolution
  console.log("2. Target IP Address:", ip);
  console.log("3. TCP SYN -> SYN-ACK -> ACK Connected");
  console.log("4. TLS 1.3 Encryption Established");
  return { status: 200, domain, ip };
}`,
                  caption: 'DNS and TCP Connection Life-cycle'
                }
              }
            ],
            interactiveCode: {
              id: 'code-web-1',
              title: 'Simulate Web Request Pipeline',
              language: 'javascript',
              initialCode: `function simulateWebRequest(url) {
  const steps = [
    "Resolving DNS for: " + url,
    "IP Address: 104.21.45.12",
    "TCP 3-Way Handshake Established",
    "TLS 1.3 Handshake Complete (HTTPS)",
    "HTTP GET / -> 200 OK (text/html)",
    "Constructing DOM Tree & Layout"
  ];
  steps.forEach((step, i) => console.log(\`[\${i+1}/6] \${step}\`));
}

simulateWebRequest("https://devmind.app");`,
              expectedOutput: '[1/6] Resolving DNS for: https://devmind.app\n[2/6] IP Address: 104.21.45.12\n[3/6] TCP 3-Way Handshake Established\n[4/6] TLS 1.3 Handshake Complete (HTTPS)\n[5/6] HTTP GET / -> 200 OK (text/html)\n[6/6] Constructing DOM Tree & Layout'
            },
            quiz: {
              id: 'quiz-web-1',
              question: 'What is the primary role of DNS (Domain Name System)?',
              options: [
                'Encrypting database rows',
                'Translating human-readable domain names into numerical IP addresses',
                'Executing JavaScript scripts',
                'Minifying stylesheets'
              ],
              correctIndex: 1,
              explanation: 'DNS maps domain names (e.g. devmind.app) into machine-routable IP addresses (e.g. 104.21.45.12).'
            }
          }
        ]
      },
      {
        id: 'mod-web-2',
        title: 'Module 2: HTTP Protocols & RESTful Conventions',
        description: 'Deep dive into HTTP/1.1 pipelining, HTTP/2 multiplexing, HTTP/3 QUIC, headers, and status codes.',
        lessons: [
          {
            id: 'lesson-web-http-protocols',
            topicId: 'web-fundamentals',
            title: 'HTTP/1.1 vs HTTP/2 vs HTTP/3 & Status Codes',
            slug: 'http-protocols-and-status-codes',
            estimatedMinutes: 20,
            xp: 30,
            summary: 'Understand multiplexing, header compression (HPACK), and HTTP status code categories (2xx, 3xx, 4xx, 5xx).',
            sections: [
              {
                title: 'HTTP Protocol Evolution',
                content: `- **HTTP/1.1**: Persistent connections, but suffers from Head-of-Line (HoL) blocking on single TCP streams.
- **HTTP/2**: Introduces binary framing and single-connection multiplexing so multiple requests stream concurrently.
- **HTTP/3**: Operates over UDP with QUIC protocol, eliminating TCP head-of-line blocking on packet loss.`
              }
            ],
            interactiveCode: {
              id: 'code-web-2',
              title: 'Parse HTTP Status Classifications',
              language: 'javascript',
              initialCode: `function classifyStatus(code) {
  if (code >= 200 && code < 300) return "2xx Success (OK / Created)";
  if (code >= 300 && code < 400) return "3xx Redirection (Moved / Cached)";
  if (code >= 400 && code < 500) return "4xx Client Error (Not Found / Unauthorized)";
  if (code >= 500) return "5xx Server Error (Internal / Bad Gateway)";
  return "Unknown";
}

[200, 201, 304, 401, 404, 500].forEach(c => console.log(\`\${c}: \${classifyStatus(c)}\`));`,
              expectedOutput: '200: 2xx Success (OK / Created)\n201: 2xx Success (OK / Created)\n304: 3xx Redirection (Moved / Cached)\n401: 4xx Client Error (Not Found / Unauthorized)\n404: 4xx Client Error (Not Found / Unauthorized)\n500: 5xx Server Error (Internal / Bad Gateway)'
            },
            quiz: {
              id: 'quiz-web-2',
              question: 'Which HTTP status code signifies that a requested resource was not modified and can be served from cache?',
              options: ['200 OK', '304 Not Modified', '404 Not Found', '502 Bad Gateway'],
              correctIndex: 1,
              explanation: '304 Not Modified informs the client that the cached copy is fresh and eliminates redundant bandwidth transfer.'
            }
          }
        ]
      },
      {
        id: 'mod-web-3',
        title: 'Module 3: Critical Rendering Path & DOM Engine',
        description: 'How browser engines parse HTML to DOM, CSS to CSSOM, compute layout geometry, and paint pixels.',
        lessons: [
          {
            id: 'lesson-web-rendering-path',
            topicId: 'web-fundamentals',
            title: 'DOM, CSSOM, Layout & Paint Pipeline',
            slug: 'critical-rendering-path',
            estimatedMinutes: 20,
            xp: 30,
            summary: 'Learn how to optimize the critical rendering path to eliminate render-blocking resources and layout thrashing.',
            sections: [
              {
                title: 'The 5 Stages of the Rendering Engine',
                content: `1. **DOM Construction**: HTML tokens converted to nodes in a tree.
2. **CSSOM Construction**: CSS rules parsed and mapped to selectors.
3. **Render Tree**: Combining DOM and CSSOM to include only visible elements.
4. **Layout (Reflow)**: Calculating geometric positions and pixel dimensions.
5. **Paint & Composite**: Rasterizing pixels and drawing GPU layers.`
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 2. HTML5 & Semantic Structure =================
  {
    id: 'course-html-basics',
    topicId: 'html-basics',
    title: 'HTML5 & Semantic Structure',
    slug: 'html-basics',
    category: 'HTML & CSS',
    level: 'beginner',
    iconName: 'SiHtml5',
    color: '#E34F26',
    description: 'Semantic elements, document outline, accessible forms, ARIA standards, and SEO metadata.',
    estimatedHours: 6,
    modules: [
      {
        id: 'mod-html-1',
        title: 'Module 1: Semantic Markup & Modern Document Layout',
        description: 'Structure clean, accessible web pages using semantic tags.',
        lessons: [
          {
            id: 'lesson-html-semantics',
            topicId: 'html-basics',
            title: 'Semantic Elements vs Generic Divs',
            slug: 'semantic-elements-and-accessibility',
            estimatedMinutes: 15,
            xp: 25,
            summary: 'Learn why main, article, nav, and section are essential for screen readers and SEO crawlers.',
            sections: [
              {
                title: 'Semantic Hierarchy',
                content: `Semantic HTML elements explicitly describe their meaning to both the browser and assistive technologies:
- \`<header>\`: Container for introductory content or site navigation.
- \`<nav>\`: Set of primary navigational links.
- \`<main>\`: The dominant, unique content of the page body.
- \`<article>\`: Self-contained, independently distributable content.
- \`<section>\`: Standalone section of functionality or content with a heading.
- \`<footer>\`: Author, copyright, and secondary links.`
              }
            ],
            interactiveCode: {
              id: 'code-html-1',
              title: 'Accessibility Node Compliance Scorer',
              language: 'javascript',
              initialCode: `const pageNodes = [
  { tag: "header", isSemantic: true },
  { tag: "nav", isSemantic: true },
  { tag: "main", isSemantic: true },
  { tag: "article", isSemantic: true },
  { tag: "div", isSemantic: false }
];

const semanticCount = pageNodes.filter(n => n.isSemantic).length;
console.log("Total Elements:", pageNodes.length);
console.log("Semantic Compliance Score:", (semanticCount / pageNodes.length) * 100 + "%");`,
              expectedOutput: 'Total Elements: 5\nSemantic Compliance Score: 80%'
            },
            quiz: {
              id: 'quiz-html-1',
              question: 'Which tag represents the unique central content of a web page?',
              options: ['<section>', '<main>', '<article>', '<div>'],
              correctIndex: 1,
              explanation: '<main> specifies the main content of the document body. Only one visible <main> should exist per page.'
            }
          }
        ]
      },
      {
        id: 'mod-html-2',
        title: 'Module 2: Accessible Form Controls & Validation',
        description: 'Build user-friendly forms with native HTML5 validation, labels, and ARIA attributes.',
        lessons: [
          {
            id: 'lesson-html-forms',
            topicId: 'html-basics',
            title: 'HTML5 Form Elements, Pattern Matching & ARIA',
            slug: 'accessible-forms-and-validation',
            estimatedMinutes: 20,
            xp: 30,
            summary: 'Build robust forms using input types (email, number, tel), required, pattern regex, and aria-describedby.',
            sections: [
              {
                title: 'Form Accessibility & Native Validation',
                content: `Forms must always pair \`<label for="inputId">\` with matching \`<input id="inputId">\`. Use input types like email and number to trigger mobile keypads and built-in client validation.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-html-3',
        title: 'Module 3: SEO, Open Graph & Performance Metadata',
        description: 'Meta viewports, Open Graph cards for social sharing, canonical URLs, and structured JSON-LD data.',
        lessons: [
          {
            id: 'lesson-html-seo',
            topicId: 'html-basics',
            title: 'Metadata, Social Graph & Structured Data',
            slug: 'seo-and-open-graph-metadata',
            estimatedMinutes: 15,
            xp: 25,
            summary: 'Optimize click-through rates and search engine ranking through proper head tags.',
            sections: [
              {
                title: 'Search Engine Optimization Essentials',
                content: `Set responsive viewport tags, Open Graph meta images (\`og:image\`), descriptions (\`og:description\`), and JSON-LD schema markers to dominate search engine results.`
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 3. CSS3 & Layouts =================
  {
    id: 'course-css-fundamentals',
    topicId: 'css-fundamentals',
    title: 'CSS3, Modern Flexbox & CSS Grid',
    slug: 'css-fundamentals',
    category: 'HTML & CSS',
    level: 'beginner',
    iconName: 'SiCss',
    color: '#1572B6',
    description: 'The box model, Flexbox 1D layout, CSS Grid 2D architecture, custom properties, and responsive design.',
    estimatedHours: 10,
    modules: [
      {
        id: 'mod-css-1',
        title: 'Module 1: The Box Model & Flexbox Alignment',
        description: 'Master content-box vs border-box, flex-direction, justify-content, and align-items.',
        lessons: [
          {
            id: 'lesson-css-box-flex',
            topicId: 'css-fundamentals',
            title: 'Box Model & Flexbox 1D Architecture',
            slug: 'box-model-and-flexbox',
            estimatedMinutes: 20,
            xp: 30,
            summary: 'Understand how padding, border, and margin interact with flex containers.',
            sections: [
              {
                title: 'The CSS Box Model',
                content: `Every HTML element is a rectangular box composed of 4 layers: Content -> Padding -> Border -> Margin. Using \`box-sizing: border-box\` ensures padding does not expand specified widths.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-css-2',
        title: 'Module 2: CSS Grid 2D Layouts & Subgrid',
        description: 'Build complex responsive dashboards with grid-template-columns, minmax, auto-fit, and grid-areas.',
        lessons: [
          {
            id: 'lesson-css-grid',
            topicId: 'css-fundamentals',
            title: 'CSS Grid Architecture & Responsive minmax()',
            slug: 'css-grid-architecture',
            estimatedMinutes: 25,
            xp: 35,
            summary: 'Create flexible grid cards that automatically wrap without media queries.',
            sections: [
              {
                title: '2D Layouts with CSS Grid',
                content: `CSS Grid is a 2-dimensional layout system for rows and columns. Using \`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))\` allows responsive wrapping effortlessly.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-css-3',
        title: 'Module 3: Custom Properties, Dark Mode & GPU Animations',
        description: 'Design token architectures with CSS variables, prefers-color-scheme, and transform/opacity transitions.',
        lessons: [
          {
            id: 'lesson-css-variables',
            topicId: 'css-fundamentals',
            title: 'CSS Variables & Hardware-Accelerated Animations',
            slug: 'css-variables-and-animations',
            estimatedMinutes: 20,
            xp: 30,
            summary: 'Implement theme switching and 60fps micro-animations.',
            sections: [
              {
                title: 'CSS Custom Properties & Transitions',
                content: `Define design tokens as \`--primary-color: #6366F1;\` at the \`:root\` level. Animate \`transform\` and \`opacity\` for GPU-accelerated 60fps smooth transitions.`
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 4. JavaScript (ES2024) Deep Dive =================
  {
    id: 'course-js-fundamentals',
    topicId: 'js-fundamentals',
    title: 'JavaScript Core & Modern ES6+',
    slug: 'javascript-core',
    category: 'JavaScript',
    level: 'beginner',
    iconName: 'SiJavascript',
    color: '#F7DF1E',
    description: 'Execution context, closures, the Event Loop, Promises, async/await, prototypes, and array pipelines.',
    estimatedHours: 14,
    modules: [
      {
        id: 'mod-js-1',
        title: 'Module 1: Execution Context, Scope & Closures',
        description: 'Understand the Call Stack, Memory Heap, Lexical Scope, and closures.',
        lessons: [
          {
            id: 'lesson-js-closures',
            topicId: 'js-fundamentals',
            title: 'Closures & Lexical Scope in Practice',
            slug: 'closures-and-scope',
            estimatedMinutes: 25,
            xp: 35,
            summary: 'A closure is the combination of a function bundled with references to its surrounding state.',
            sections: [
              {
                title: 'How Closures Work Under the Hood',
                content: `In JavaScript, whenever a function is declared inside another function, the inner function retains lexical access to the outer function's variable scope, even after the outer function has returned.`
              }
            ],
            interactiveCode: {
              id: 'code-js-1',
              title: 'Create a Private Counter with Closure',
              language: 'javascript',
              initialCode: `function createCounter(initialValue = 0) {
  let count = initialValue; // Private state in closure
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count
  };
}

const counter = createCounter(10);
console.log("Initial:", counter.getValue());
console.log("After Increment:", counter.increment());
console.log("After Increment:", counter.increment());
console.log("After Decrement:", counter.decrement());`,
              expectedOutput: 'Initial: 10\nAfter Increment: 11\nAfter Increment: 12\nAfter Decrement: 11'
            }
          }
        ]
      },
      {
        id: 'mod-js-2',
        title: 'Module 2: The Event Loop & Async JavaScript',
        description: 'Microtasks vs Macrotasks, Promises, async/await, and non-blocking concurrency.',
        lessons: [
          {
            id: 'lesson-js-eventloop',
            topicId: 'js-fundamentals',
            title: 'Event Loop, Microtasks & Async/Await',
            slug: 'event-loop-and-promises',
            estimatedMinutes: 30,
            xp: 40,
            summary: 'Understand why Promise.then() runs before setTimeout(..., 0).',
            sections: [
              {
                title: 'Microtasks and Macrotasks',
                content: `The JavaScript single-threaded engine handles concurrency via the Event Loop. Microtasks (Promise callbacks, queueMicrotask) drain completely before Macrotasks (setTimeout, setInterval, DOM events).`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-js-3',
        title: 'Module 3: ES6+ Functional Methods & Prototypes',
        description: 'Deep dive into map, filter, reduce, prototype inheritance, and destructuring.',
        lessons: [
          {
            id: 'lesson-js-functional',
            topicId: 'js-fundamentals',
            title: 'Array Pipelines (map, filter, reduce) & Immutability',
            slug: 'functional-array-methods',
            estimatedMinutes: 20,
            xp: 30,
            summary: 'Write declarative data transformations without side effects.',
            sections: [
              {
                title: 'Functional Transformations',
                content: `Array methods like \`map\`, \`filter\`, and \`reduce\` return new arrays without mutating original collections, which is the foundational pattern for React and immutable state management.`
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 5. TypeScript 5 for Professionals =================
  {
    id: 'course-ts-fundamentals',
    topicId: 'ts-fundamentals',
    title: 'TypeScript 5 for Professionals',
    slug: 'typescript-fundamentals',
    category: 'TypeScript',
    level: 'intermediate',
    iconName: 'SiTypescript',
    color: '#3178C6',
    description: 'Type inference, interfaces, generics, discriminated unions, utility types, and compiler strictness.',
    estimatedHours: 12,
    modules: [
      {
        id: 'mod-ts-1',
        title: 'Module 1: Type Primitives, Interfaces & Type Aliases',
        description: 'Static type checking, structural typing, and union/intersection types.',
        lessons: [
          {
            id: 'lesson-ts-basics',
            topicId: 'ts-fundamentals',
            title: 'Type Aliases vs Interfaces & Type Narrowing',
            slug: 'interfaces-and-type-aliases',
            estimatedMinutes: 20,
            xp: 30,
            summary: 'Learn how to use discriminated unions to eliminate runtime bugs.',
            sections: [
              {
                title: 'Structural Subtyping in TypeScript',
                content: `TypeScript uses structural subtyping: if two types have compatible members, they are considered equivalent. Use discriminated unions with literal properties for rock-solid branching.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-ts-2',
        title: 'Module 2: Generics & Built-In Utility Types',
        description: 'Write reusable types using Generic parameters, Partial, Pick, Omit, and Record.',
        lessons: [
          {
            id: 'lesson-ts-generics',
            topicId: 'ts-fundamentals',
            title: 'Mastering Generics & Utility Types in APIs',
            slug: 'generics-and-utility-types',
            estimatedMinutes: 25,
            xp: 35,
            summary: 'Build type-safe HTTP clients and state containers with Generics.',
            sections: [
              {
                title: 'Generic Type Parameters',
                content: `Generics like \`function fetchApi<T>(url: string): Promise<T>\` enable reusable code that retains strict compile-time types for any data model.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-ts-3',
        title: 'Module 3: Advanced Types: Conditional, Keyof & Template Literals',
        description: 'Mappped types, infer keyword, and template literal type validations.',
        lessons: [
          {
            id: 'lesson-ts-advanced',
            topicId: 'ts-fundamentals',
            title: 'Conditional Types & Template Literal String Types',
            slug: 'conditional-types-and-infer',
            estimatedMinutes: 30,
            xp: 40,
            summary: 'Extract return types and create domain-specific string templates.',
            sections: [
              {
                title: 'Type-Level Programming',
                content: `Using \`T extends (...args: any[]) => infer R ? R : any\`, TypeScript allows writing functions that compute types at compile-time.`
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 6. React 19 & Modern Hooks =================
  {
    id: 'course-react-fundamentals',
    topicId: 'react-fundamentals',
    title: 'React 19 & Modern Component Architecture',
    slug: 'react-19-fundamentals',
    category: 'React',
    level: 'intermediate',
    iconName: 'FaReact',
    color: '#61DAFB',
    description: 'Virtual DOM, JSX, React 19 Actions, useActionState, useOptimistic, use(), custom hooks, and memoization.',
    estimatedHours: 16,
    modules: [
      {
        id: 'mod-react-1',
        title: 'Module 1: Virtual DOM, JSX & Core Hooks',
        description: 'useState, useEffect, useMemo, useCallback, and component lifecycle.',
        lessons: [
          {
            id: 'lesson-react-hooks',
            topicId: 'react-fundamentals',
            title: 'Modern React Hooks & Immutability Patterns',
            slug: 'react-hooks-and-state',
            estimatedMinutes: 25,
            xp: 35,
            summary: 'Manage local and derived component state with predictable renders.',
            sections: [
              {
                title: 'React 19 Rendering Principles',
                content: `React converts JSX to lightweight Virtual DOM nodes, diffs the changes via fiber reconciliation, and batches updates efficiently to minimize browser reflow.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-react-2',
        title: 'Module 2: React 19 New Features: Actions & use()',
        description: 'Async form Actions, useActionState, useOptimistic, and direct Promise unwrap with use().',
        lessons: [
          {
            id: 'lesson-react-19-actions',
            topicId: 'react-fundamentals',
            title: 'React 19 Async Form Actions & useOptimistic',
            slug: 'react-19-actions-and-optimistic-updates',
            estimatedMinutes: 30,
            xp: 40,
            summary: 'Eliminate manual pending states with native React 19 form actions.',
            sections: [
              {
                title: 'Native Form Actions in React 19',
                content: `React 19 introduces automatic pending state and optimistic updates via \`useActionState\` and \`useOptimistic\`, reducing boilerplate code for server interactions.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-react-3',
        title: 'Module 3: Custom Hooks, Context API & Performance Profiling',
        description: 'Extract business logic into reusable custom hooks and profile re-renders.',
        lessons: [
          {
            id: 'lesson-react-custom-hooks',
            topicId: 'react-fundamentals',
            title: 'Custom Hook Architecture & Code Splitting',
            slug: 'custom-hooks-and-performance',
            estimatedMinutes: 25,
            xp: 35,
            summary: 'Lazy load routes and extract stateful domain logic.',
            sections: [
              {
                title: 'Extracting Domain Hooks',
                content: `Custom hooks keep presentation components clean and declarative by encapsulating stateful subscriptions, timers, and API calls into testable functions.`
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 7. Python 3.12 Core & OOP =================
  {
    id: 'course-python-fundamentals',
    topicId: 'python-fundamentals',
    title: 'Python 3.12 Core, OOP & Backend APIs',
    slug: 'python-core',
    category: 'Backend Awareness',
    level: 'beginner',
    iconName: 'FaPython',
    color: '#3776AB',
    description: 'Data structures, list comprehensions, OOP magic methods, decorators, and FastAPI async services.',
    estimatedHours: 12,
    modules: [
      {
        id: 'mod-py-1',
        title: 'Module 1: Python Fundamentals & Data Structures',
        description: 'Lists, dicts, tuples, sets, slicing, and idiomatic comprehensions.',
        lessons: [
          {
            id: 'lesson-py-basics',
            topicId: 'python-fundamentals',
            title: 'Idiomatic Python & Comprehensions',
            slug: 'python-data-structures-and-syntax',
            estimatedMinutes: 20,
            xp: 30,
            summary: 'Write elegant Pythonic code with dictionary and list comprehensions.',
            sections: [
              {
                title: 'Python Comprehensions',
                content: `List and dict comprehensions like \`[x*2 for x in items if x > 0]\` provide concise, expressive data transformations with C-speed internal iteration.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-py-2',
        title: 'Module 2: Object-Oriented Python & Decorators',
        description: 'Classes, inheritance, dunder methods (__init__, __str__, __repr__), and function decorators.',
        lessons: [
          {
            id: 'lesson-py-oop',
            topicId: 'python-fundamentals',
            title: 'OOP, Dunder Methods & Decorators',
            slug: 'python-oop-and-decorators',
            estimatedMinutes: 25,
            xp: 35,
            summary: 'Construct robust classes with custom operator overloading.',
            sections: [
              {
                title: 'Python Dunder Methods & Meta-Programming',
                content: `Special methods like \`__repr__\`, \`__eq__\`, and \`__len__\` allow custom Python classes to integrate smoothly with standard Python language syntax.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-py-3',
        title: 'Module 3: Asynchronous Python & FastAPI Services',
        description: 'Asyncio event loop, coroutines (async/await), and high-performance REST APIs with FastAPI.',
        lessons: [
          {
            id: 'lesson-py-fastapi',
            topicId: 'python-fundamentals',
            title: 'Building Async REST APIs with FastAPI & Pydantic',
            slug: 'async-python-and-fastapi',
            estimatedMinutes: 30,
            xp: 40,
            summary: 'Validate schemas and build asynchronous microservices.',
            sections: [
              {
                title: 'FastAPI & Asynchronous I/O',
                content: `FastAPI combines Python type hints with Pydantic for automated data validation, interactive Swagger documentation, and high-throughput async endpoints.`
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 8. Java 21 & Spring Boot 3 =================
  {
    id: 'course-java-fundamentals',
    topicId: 'java-fundamentals',
    title: 'Java 21 Core & Spring Boot 3 Enterprise',
    slug: 'java-21-core',
    category: 'Backend Awareness',
    level: 'intermediate',
    iconName: 'FaJava',
    color: '#ED8B00',
    description: 'Records, pattern matching, Virtual Threads (Project Loom), Spring Boot DI, and Spring Data JPA.',
    estimatedHours: 15,
    modules: [
      {
        id: 'mod-java-1',
        title: 'Module 1: Modern Java 21 Syntax & Virtual Threads',
        description: 'Immutable records, sealed classes, pattern matching switch expressions, and lightweight virtual threads.',
        lessons: [
          {
            id: 'lesson-java-modern',
            topicId: 'java-fundamentals',
            title: 'Java 21 Records, Pattern Matching & Virtual Threads',
            slug: 'java-21-modern-features',
            estimatedMinutes: 25,
            xp: 35,
            summary: 'Modernize Java code with concise syntax and high-throughput concurrency.',
            sections: [
              {
                title: 'Virtual Threads (Project Loom)',
                content: `Java 21 Virtual Threads are lightweight threads managed by the JVM rather than the operating system kernel, allowing millions of concurrent requests with low memory footprints.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-java-2',
        title: 'Module 2: Spring Boot 3 Dependency Injection & REST',
        description: 'IoC container, @SpringBootApplication, @RestController, @Service, and validation annotations.',
        lessons: [
          {
            id: 'lesson-java-spring',
            topicId: 'java-fundamentals',
            title: 'Spring Boot REST Controllers & Dependency Injection',
            slug: 'spring-boot-rest-controllers',
            estimatedMinutes: 30,
            xp: 40,
            summary: 'Build production-ready microservices with Spring Boot 3.',
            sections: [
              {
                title: 'Spring Inversion of Control (IoC)',
                content: `Spring Boot manages bean lifecycles and dependency injection via annotations like \`@Autowired\`, \`@Service\`, and \`@RestController\`.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-java-3',
        title: 'Module 3: Spring Data JPA, Hibernate & PostgreSQL',
        description: 'Entity mapping, JpaRepository, derived query methods, and relational transactions (@Transactional).',
        lessons: [
          {
            id: 'lesson-java-jpa',
            topicId: 'java-fundamentals',
            title: 'Database Persistence with Spring Data JPA',
            slug: 'spring-data-jpa-and-hibernate',
            estimatedMinutes: 25,
            xp: 35,
            summary: 'Manage database persistence and relational integrity.',
            sections: [
              {
                title: 'Spring Data Repositories',
                content: `JpaRepository interfaces provide out-of-the-box CRUD and pagination methods without needing manual boilerplate SQL.`
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 9. Relational Databases & SQL =================
  {
    id: 'course-sql-fundamentals',
    topicId: 'sql-fundamentals',
    title: 'Relational Databases & SQL Mastery',
    slug: 'sql-fundamentals',
    category: 'Backend Awareness',
    level: 'intermediate',
    iconName: 'SiPostgresql',
    color: '#336791',
    description: 'DDL, DML, relational joins (INNER, LEFT, FULL), subqueries, B-Tree indexes, and ACID transactions.',
    estimatedHours: 12,
    modules: [
      {
        id: 'mod-sql-1',
        title: 'Module 1: SQL Fundamentals, DDL & Aggregations',
        description: 'CREATE TABLE, SELECT, WHERE, GROUP BY, HAVING, and aggregate functions.',
        lessons: [
          {
            id: 'lesson-sql-basics',
            topicId: 'sql-fundamentals',
            title: 'SQL Schema Design & Aggregate Data Analysis',
            slug: 'sql-schemas-and-aggregations',
            estimatedMinutes: 20,
            xp: 30,
            summary: 'Design relational tables with primary keys, foreign keys, and indexes.',
            sections: [
              {
                title: 'SQL Schema Construction',
                content: `Relational database schemas enforce referential integrity using primary and foreign key constraints across normalized tables.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-sql-2',
        title: 'Module 2: Relational Joins & Subqueries',
        description: 'Master INNER JOIN, LEFT JOIN, FULL OUTER JOIN, and correlated subqueries.',
        lessons: [
          {
            id: 'lesson-sql-joins',
            topicId: 'sql-fundamentals',
            title: 'Relational Joins, Cross-Table Queries & CTEs',
            slug: 'sql-joins-and-subqueries',
            estimatedMinutes: 25,
            xp: 35,
            summary: 'Combine normalized tables with high efficiency using Common Table Expressions.',
            sections: [
              {
                title: 'Relational Joins and CTEs',
                content: `INNER JOIN retrieves matching rows from both tables, LEFT JOIN preserves all left-table rows, and CTEs (\`WITH ... AS\`) make multi-stage aggregations clean and readable.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-sql-3',
        title: 'Module 3: Indexing, ACID Transactions & Query Tuning',
        description: 'B-Tree indexes, transactions (BEGIN, COMMIT, ROLLBACK), and EXPLAIN query plans.',
        lessons: [
          {
            id: 'lesson-sql-tuning',
            topicId: 'sql-fundamentals',
            title: 'Database Indexing & ACID Transaction Guarantees',
            slug: 'sql-indexes-and-acid-transactions',
            estimatedMinutes: 30,
            xp: 40,
            summary: 'Optimize query execution time from O(N) table scans to O(log N) indexed lookups.',
            sections: [
              {
                title: 'B-Tree Indexes and ACID Properties',
                content: `B-Tree indexes allow logarithmically fast search. ACID (Atomicity, Consistency, Isolation, Durability) ensures mission-critical data integrity during financial and user transactions.`
              }
            ]
          }
        ]
      }
    ]
  },

  // ================= 10. Frontend System Design =================
  {
    id: 'course-frontend-architecture',
    topicId: 'frontend-architecture',
    title: 'Frontend System Design & Architecture',
    slug: 'frontend-system-design',
    category: 'Architecture',
    level: 'professional',
    iconName: 'SiNextdotjs',
    color: '#A855F7',
    description: 'Clean Architecture, monorepos, Core Web Vitals, microfrontends, and enterprise state machines.',
    estimatedHours: 16,
    modules: [
      {
        id: 'mod-arch-1',
        title: 'Module 1: Clean Architecture & Separation of Concerns',
        description: 'Decouple presentation from domain logic and API access layers.',
        lessons: [
          {
            id: 'lesson-arch-clean-code',
            topicId: 'frontend-architecture',
            title: 'Clean Architecture in Modern Web Applications',
            slug: 'clean-architecture-principles',
            estimatedMinutes: 30,
            xp: 40,
            summary: 'Architect scalable web codebases that remain resilient to framework changes.',
            sections: [
              {
                title: 'Layered Architecture for Web Apps',
                content: `Isolate Presentation (React UI), Domain (Business Logic & Hooks), and Infrastructure (API Clients & Cache) layers to ensure testability and prevent spaghetti dependencies.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-arch-2',
        title: 'Module 2: Core Web Vitals & Web Performance Tuning',
        description: 'Optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).',
        lessons: [
          {
            id: 'lesson-arch-web-vitals',
            topicId: 'frontend-architecture',
            title: 'Measuring & Optimizing LCP, INP, and CLS',
            slug: 'core-web-vitals-optimization',
            estimatedMinutes: 25,
            xp: 35,
            summary: 'Achieve 95+ Lighthouse performance scores with image optimization and code splitting.',
            sections: [
              {
                title: 'Core Web Vitals Thresholds',
                content: `Optimize LCP (<= 2.5s), INP (<= 200ms), and CLS (<= 0.1) using responsive image \`srcset\`, code splitting with \`React.lazy\`, and explicit element dimensions.`
              }
            ]
          }
        ]
      },
      {
        id: 'mod-arch-3',
        title: 'Module 3: Scalable State Architecture & Microfrontends',
        description: 'Server state management (TanStack Query), client state (Zustand), and Module Federation.',
        lessons: [
          {
            id: 'lesson-arch-microfrontends',
            topicId: 'frontend-architecture',
            title: 'Microfrontend Architecture & Distributed Caching',
            slug: 'microfrontends-and-caching',
            estimatedMinutes: 30,
            xp: 40,
            summary: 'Scale large developer teams with autonomous microfrontends.',
            sections: [
              {
                title: 'Microfrontends & Server State',
                content: `Use Module Federation for autonomous team deployments, and TanStack Query for cache invalidation, deduplication, and background refetching.`
              }
            ]
          }
        ]
      }
    ]
  }
];
