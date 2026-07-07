import { useState } from 'react';
import type { FormEvent } from 'react';

interface AddTodoBarProps {
  onAdd: (text: string) => void;
}

export default function AddTodoBar({ onAdd }: AddTodoBarProps) {
  const [text, setText] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="m-4 flex items-center gap-4 rounded-2xl bg-card-footer p-3 sm:m-6"
    >
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="New Note"
        aria-label="New todo text"
        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-xl bg-white px-6 py-3 font-medium text-slate-900 transition-opacity hover:opacity-90"
      >
        Add New Note
      </button>
    </form>
  );
}
