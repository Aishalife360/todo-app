import type { ReactNode } from 'react';

interface AppCardProps {
  children: ReactNode;
}

export default function AppCard({ children }: AppCardProps) {
  return (
    <div className="flex min-h-screen flex-col bg-card">
      <header className="border-b border-border px-6 pt-8 pb-6 sm:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="text-2xl font-bold tracking-wide uppercase">To Do App</h1>
          <p className="mt-1 text-sm text-text-muted">
            Stop Procrastinating , Start Organizing
          </p>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">{children}</div>
    </div>
  );
}
