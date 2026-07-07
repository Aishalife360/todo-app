import type { TodoFilter } from '../types/todo';

interface TodoFilterTabsProps {
  filter: TodoFilter;
  onChange: (filter: TodoFilter) => void;
}

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function TodoFilterTabs({ filter, onChange }: TodoFilterTabsProps) {
  return (
    <div className="flex gap-2" role="tablist" aria-label="Filter todos">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          role="tab"
          aria-selected={filter === value}
          onClick={() => onChange(value)}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            filter === value
              ? 'bg-accent text-white'
              : 'bg-input text-text-muted hover:text-text-primary'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
