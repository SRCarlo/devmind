import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiHelpCircle, FiZap } from 'react-icons/fi';
import { QuizQuestion } from '../../types/learning';
import { useProgress } from '../../app/providers/ProgressProvider';
import { Button } from '../ui/Button';

interface QuizComponentProps {
  quiz: QuizQuestion;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ quiz }) => {
  const { progress, recordQuizAnswer, triggerConfetti } = useProgress();
  const priorAnswer = progress.quizAnswers[quiz.id];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    priorAnswer ? priorAnswer.answeredIndex : null
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!priorAnswer);

  const isCorrect = selectedIndex === quiz.correctIndex;

  const handleSubmit = () => {
    if (selectedIndex === null) return;
    setIsSubmitted(true);
    const correct = selectedIndex === quiz.correctIndex;
    recordQuizAnswer(quiz.id, selectedIndex, correct, 30);
    if (correct) {
      triggerConfetti();
    }
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setSelectedIndex(null);
  };

  return (
    <div className="p-6 rounded-2xl theme-bg-card border theme-border shadow-md my-6 transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <FiHelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold theme-text-muted uppercase tracking-wider">
              Knowledge Check
            </h4>
            <span className="text-[11px] theme-text-muted">Test your understanding</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/20 text-xs font-semibold">
          <FiZap className="w-3.5 h-3.5" />
          <span>+30 XP</span>
        </div>
      </div>

      {/* Question */}
      <p className="text-base font-bold theme-text-heading mb-5 leading-snug">
        {quiz.question}
      </p>

      {/* Options List */}
      <div className="space-y-2.5 mb-5">
        {quiz.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          let optionStyle = 'theme-bg-subtle border theme-border theme-text-main hover:border-indigo-500';

          if (isSubmitted) {
            if (idx === quiz.correctIndex) {
              optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold ring-1 ring-emerald-500/40';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/40';
            } else {
              optionStyle = 'theme-bg-subtle opacity-50 theme-border theme-text-muted';
            }
          } else if (isSelected) {
            optionStyle = 'bg-indigo-500/15 border-indigo-600 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500/40 font-semibold';
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => setSelectedIndex(idx)}
              className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all duration-150 ${optionStyle}`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'theme-bg-card theme-text-muted theme-border'
                }`}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="leading-relaxed flex-1">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation Feedback */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-xl border mb-5 text-xs sm:text-sm leading-relaxed ${
              isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-200'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1">
              {isCorrect ? (
                <>
                  <FiCheckCircle className="text-emerald-500 w-4 h-4" />
                  <span>Correct! Well done.</span>
                </>
              ) : (
                <>
                  <FiXCircle className="text-rose-500 w-4 h-4" />
                  <span>Not quite right.</span>
                </>
              )}
            </div>
            <p className="mt-1">{quiz.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        {isSubmitted ? (
          <Button size="sm" variant="outline" onClick={handleRetry}>
            Try Again
          </Button>
        ) : (
          <Button
            size="sm"
            variant="primary"
            disabled={selectedIndex === null}
            onClick={handleSubmit}
          >
            Submit Answer
          </Button>
        )}
      </div>
    </div>
  );
};
