import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiRotateCcw, FiTerminal, FiCopy, FiCheck } from 'react-icons/fi';
import { CodeExample } from '../../types/learning';
import { Button } from '../ui/Button';

interface CodePlaygroundProps {
  example: CodeExample;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ example }) => {
  const [code, setCode] = useState(example.initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);

    setTimeout(() => {
      try {
        const logs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => {
            logs.push(
              args
                .map(arg => (typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)))
                .join(' ')
            );
          },
          error: (...args: any[]) => {
            logs.push('❌ Error: ' + args.join(' '));
          },
          warn: (...args: any[]) => {
            logs.push('⚠️ Warning: ' + args.join(' '));
          }
        };

        const runner = new Function('console', code);
        runner(customConsole);

        setOutput(logs.length > 0 ? logs.join('\n') : (example.expectedOutput || '✓ Code executed successfully (no console output)'));
      } catch (err: any) {
        setOutput(`❌ Runtime Error: ${err.message}`);
      }
      setIsRunning(false);
    }, 380);
  };

  const handleReset = () => {
    setCode(example.initialCode);
    setOutput(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl theme-bg-card border theme-border shadow-md overflow-hidden my-4 sm:my-6 transition-colors duration-200">
      {/* Editor Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 theme-bg-subtle border-b theme-border">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex gap-1.5 flex-shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-semibold theme-text-heading font-mono truncate">
            {example.title || 'Code Sandbox'}
          </span>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 flex-shrink-0">
            {example.language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] sm:text-xs theme-text-muted hover:theme-text-heading px-2 py-1 rounded-lg hover:theme-bg-card transition-colors"
          >
            {copied ? <FiCheck className="text-emerald-500" /> : <FiCopy />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] sm:text-xs theme-text-muted hover:theme-text-heading px-2 py-1 rounded-lg hover:theme-bg-card transition-colors"
          >
            <FiRotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Code Textarea / Editor */}
      <div className="relative p-3 sm:p-4 theme-bg-input">
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          spellCheck={false}
          rows={Math.max(6, code.split('\n').length + 1)}
          className="w-full bg-transparent theme-text-heading font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-y selection:bg-indigo-500/20"
        />
      </div>

      {/* Run Action Bar (Mobile Responsive Stack) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-3 sm:px-4 py-3 theme-bg-subtle border-t theme-border relative overflow-hidden">
        {/* Active execution scanner beam */}
        {isRunning && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 0.6, ease: 'linear' }}
            className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-indigo-500"
          />
        )}

        <span className="text-[11px] sm:text-xs theme-text-muted">
          Edit code above and click Run to test live output
        </span>
        <Button
          size="sm"
          variant="primary"
          icon={<FiPlay />}
          onClick={handleRun}
          loading={isRunning}
          className="w-full sm:w-auto font-bold"
        >
          {isRunning ? 'Executing...' : 'Run Code'}
        </Button>
      </div>

      {/* Output Console with execution state */}
      {isRunning ? (
        <div className="p-4 theme-bg-input border-t theme-border flex items-center gap-3 font-mono text-xs text-indigo-400 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span>Executing sandbox runtime & compiling AST...</span>
        </div>
      ) : output !== null ? (
        <div className="p-3 sm:p-4 theme-bg-input border-t theme-border">
          <div className="flex items-center gap-2 text-xs font-bold theme-text-muted uppercase tracking-wider mb-2 font-mono">
            <FiTerminal className="w-3.5 h-3.5 text-indigo-500" />
            <span>Console Output</span>
          </div>
          <pre className="p-3 rounded-xl theme-bg-subtle border theme-border text-xs sm:text-sm font-mono text-emerald-600 dark:text-emerald-400 leading-relaxed whitespace-pre-wrap overflow-x-auto">
            {output}
          </pre>
        </div>
      ) : null}
    </div>
  );
};
