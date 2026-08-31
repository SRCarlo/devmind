export interface AIPromptTemplate {
  label: string;
  query: string;
}

export const AI_QUICK_PROMPTS: AIPromptTemplate[] = [
  {
    label: 'Explain like I am a beginner',
    query: 'Can you explain this concept simply with a real-world analogy and zero jargon?'
  },
  {
    label: 'Common interview questions',
    query: 'What are the top 3 interview questions senior engineers ask regarding this topic?'
  },
  {
    label: 'Practical real-world code example',
    query: 'Show me a clean, modern production code snippet demonstrating best practices for this.'
  },
  {
    label: 'Common pitfalls to avoid',
    query: 'What are the most dangerous antipatterns or bugs developers make when using this?'
  }
];

export function getMockAIResponse(topicTitle: string, query: string): string {
  const q = query.toLowerCase();

  if (q.includes('beginner') || q.includes('analogy') || q.includes('simply')) {
    return `### 💡 Beginner Explanation: ${topicTitle}

Think of **${topicTitle}** like a specialized blueprint in construction:
- Without it, you would have to manually fabricate every individual joint from scratch every time.
- With it, you get standardized, reusable, and predictable building blocks that snap together cleanly.

**Key Rule to Remember:**
Always start with small, focused pieces. Master the fundamentals before applying complex optimizations.`;
  }

  if (q.includes('interview') || q.includes('question')) {
    return `### 🎯 Top Interview Focus for ${topicTitle}

1. **"How does this behave under concurrent or asynchronous updates?"**
   *Tip: Highlight immutability, batching mechanisms, and event loop microtask sequencing.*

2. **"What are the memory and re-render implications?"**
   *Tip: Discuss reference equality checks, closure retainment, and profiling tools.*

3. **"How would you migrate a legacy codebase to adopt this pattern safely?"**
   *Tip: Emphasize gradual adoption, adapter layers, and regression tests.*`;
  }

  if (q.includes('pitfall') || q.includes('antipattern') || q.includes('mistake') || q.includes('bug')) {
    return `### ⚠️ Critical Pitfalls in ${topicTitle}

1. **Mutating State Directly in Memory:** Always treat state as immutable to preserve reactive change tracking.
2. **Missing or Incomplete Cleanup Handlers:** Always disconnect WebSockets, event listeners, or abortable fetch controllers.
3. **Premature Optimization:** Do not clutter components with memoization abstractions before identifying an actual bottleneck via flamegraph profiling.`;
  }

  return `### 🤖 DevMind AI Assistant: ${topicTitle}

Here is a breakdown for your query on **${topicTitle}**:

- **Core Principle**: In modern frontend architecture, ${topicTitle} solves the problem of predictable state synchronization and modularity.
- **Best Practice**: Keep dependencies explicit, isolate side effects at domain boundaries, and leverage TypeScript for compile-time safety.

\`\`\`typescript
// Production Pattern for ${topicTitle}
export function use${topicTitle.replace(/[^a-zA-Z]/g, '')}Handler() {
  // 1. Explicit domain contract
  // 2. Safe error boundary fallback
  // 3. Telemetry tracking
}
\`\`\`

Would you like to explore a deep-dive challenge or review prerequisite concepts next?`;
}
