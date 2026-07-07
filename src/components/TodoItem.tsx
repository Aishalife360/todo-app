import { Trash2 } from 'lucide-react';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-4 px-6 py-4 sm:px-8">
      <button
        type="button"
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={todo.completed ? 'Mark as not done' : 'Mark as done'}
        onClick={() => onToggle(todo.id, !todo.completed)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          todo.completed ? 'border-accent bg-accent' : 'border-text-muted'
        }`}
      >
        {todo.completed && (
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 fill-none stroke-white stroke-[2.5]"
          >
            <path d="M3 8.5 6.5 12 13 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <span
        className={`flex-1 text-base break-words ${
          todo.completed ? 'text-text-muted line-through' : 'text-text-primary'
        }`}
      >
        {todo.text}
      </span>
      <button
        type="button"
        aria-label="Delete todo"
        onClick={() => onDelete(todo.id)}
        className="shrink-0 text-text-muted transition-colors hover:text-red-400"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </li>
  );
}
