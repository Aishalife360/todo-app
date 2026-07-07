interface AuthInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}

export default function AuthInput({
  type,
  placeholder,
  value,
  onChange,
  autoComplete,
}: AuthInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      required
      className="w-full rounded-2xl bg-input px-6 py-4 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-accent focus:outline-none"
    />
  );
}
