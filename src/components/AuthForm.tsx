import type { FormEvent, ReactNode } from 'react';

interface AuthFormProps {
  heading: string;
  submitLabel: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error?: string | null;
  submitting?: boolean;
  children: ReactNode;
  footer: ReactNode;
}

export default function AuthForm({
  heading,
  submitLabel,
  onSubmit,
  error,
  submitting,
  children,
  footer,
}: AuthFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center gap-6 px-6 py-14 sm:px-8 sm:py-16"
    >
      <h2 className="text-3xl font-medium text-text-muted sm:text-4xl">{heading}</h2>
      <div className="flex w-full max-w-xl flex-col gap-5">{children}</div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {footer}
      <button
        type="submit"
        disabled={submitting}
        className="w-full max-w-xl rounded-2xl bg-white py-4 font-medium text-slate-900 transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {submitLabel}
      </button>
    </form>
  );
}
