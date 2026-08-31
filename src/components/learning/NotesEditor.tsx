import React, { useState, useEffect } from 'react';
import { FiSave, FiEdit2, FiCheck } from 'react-icons/fi';
import { useProgress } from '../../app/providers/ProgressProvider';
import { useToast } from '../../app/providers/ToastProvider';
import { Button } from '../ui/Button';

interface NotesEditorProps {
  topicId: string;
  topicTitle?: string;
}

export const NotesEditor: React.FC<NotesEditorProps> = ({ topicId, topicTitle = 'Topic' }) => {
  const { progress, saveTopicNote } = useProgress();
  const { showToast } = useToast();
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setNote(progress.notes[topicId] || '');
  }, [topicId, progress.notes]);

  const handleSave = () => {
    saveTopicNote(topicId, note);
    setIsSaved(true);
    showToast('✓ Notes saved locally!', 'success');
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-5 rounded-2xl theme-bg-card border theme-border my-6 space-y-3 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold theme-text-muted uppercase tracking-wider">
          <FiEdit2 className="text-indigo-500" />
          <span>Study Notes for {topicTitle}</span>
        </div>
        <span className="text-[11px] theme-text-muted">Saved in browser storage</span>
      </div>

      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={4}
        placeholder="Jot down notes, code reminders, takeaways..."
        className="w-full theme-bg-input border theme-border rounded-xl p-3 text-xs sm:text-sm theme-text-heading placeholder-slate-400 focus:outline-none focus:border-indigo-500 font-mono-code leading-relaxed"
      />

      <div className="flex justify-end">
        <Button
          size="sm"
          variant="primary"
          icon={isSaved ? <FiCheck className="text-white" /> : <FiSave />}
          onClick={handleSave}
        >
          {isSaved ? 'Saved Locally!' : 'Save Notes'}
        </Button>
      </div>
    </div>
  );
};
