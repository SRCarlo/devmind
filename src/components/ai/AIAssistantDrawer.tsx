import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiSend, 
  FiZap, 
  FiHelpCircle, 
  FiCode, 
  FiAlertCircle
} from 'react-icons/fi';
import { LuSparkles } from 'react-icons/lu';
import { Button } from '../ui/Button';
import { getMockAIResponse, AI_QUICK_PROMPTS, AIPromptTemplate } from '../../data/mockAIResponses';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopicTitle?: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  initialTopicTitle = 'Frontend Architecture'
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am your DevMind Technical Study Copilot. How can I help you with **${initialTopicTitle}** or software engineering today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (initialTopicTitle) {
      setMessages([
        {
          id: 'welcome-' + Date.now(),
          sender: 'assistant',
          text: `Hello! I'm your DevMind Study Copilot. Ready to dive into **${initialTopicTitle}**! Feel free to ask for analogies, interview prep, or code examples.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [initialTopicTitle]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getMockAIResponse(initialTopicTitle, text);
      const aiMsg: Message = {
        id: 'msg-ai-' + Date.now(),
        sender: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const getPromptIcon = (label: string) => {
    if (label.includes('beginner')) return <FiHelpCircle className="w-3 h-3 text-emerald-500" />;
    if (label.includes('code')) return <FiCode className="w-3 h-3 text-cyan-500" />;
    if (label.includes('interview')) return <FiZap className="w-3 h-3 text-amber-500" />;
    if (label.includes('pitfalls')) return <FiAlertCircle className="w-3 h-3 text-rose-500" />;
    return <LuSparkles className="w-3 h-3 text-indigo-500" />;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
        />

        {/* Drawer panel */}
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-full max-w-md theme-bg-card border-l theme-border shadow-2xl z-50 flex flex-col pointer-events-auto select-none transition-colors duration-200"
        >
          {/* Header */}
          <div className="p-4 border-b theme-border theme-bg-nav flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <LuSparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold theme-text-heading">DevMind Copilot</h3>
                <p className="text-[11px] theme-text-muted">Context: {initialTopicTitle}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg theme-text-muted hover:theme-text-heading hover:theme-bg-subtle"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Carousel / Grid */}
          <div className="p-3 border-b theme-border theme-bg-subtle">
            <div className="text-[10px] font-bold theme-text-muted uppercase tracking-wider mb-2">
              Quick Study Prompts
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {AI_QUICK_PROMPTS.map((p: AIPromptTemplate, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg theme-bg-card border theme-border hover:border-indigo-500 text-[11px] theme-text-heading font-medium whitespace-nowrap shadow-sm transition-all"
                >
                  {getPromptIcon(p.label)}
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                      : 'theme-bg-subtle theme-text-main border theme-border rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-[10px] theme-text-muted font-mono mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs theme-text-muted p-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce delay-200" />
                <span>Thinking...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t theme-border theme-bg-nav">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Ask about this topic or paste code..."
                className="flex-1 theme-bg-input border theme-border rounded-xl px-3.5 py-2 text-xs theme-text-heading placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              <Button size="sm" variant="primary" icon={<FiSend />} type="submit" disabled={!inputText.trim()}>
                Send
              </Button>
            </form>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
};
