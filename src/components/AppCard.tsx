import type { ReactNode } from 'react';

interface AppCardProps {
  children: ReactNode;
}

export default function AppCard({ children }: AppCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-card">
        <header className="border-b border-border px-6 pt-8 pb-6 sm:px-8">
          <h1 className="text-2xl font-bold tracking-wide uppercase">To Do App</h1>
          <p className="mt-1 text-sm text-text-muted">
            Stop Procrastinating , Start Organizing
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}
