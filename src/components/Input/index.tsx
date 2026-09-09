import type { ComponentProps } from "react";

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-brand-primary-navy "
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`
          w-full px-3.5 py-2.5
          bg-brand-container border border-brand-surface-base rounded-lg
          text-brand-primary-navy placeholder:text-zinc-500 text-sm
          outline-none transition-colors
          focus:brand-primary-navy focus:ring-1 focus:brand-primary-navy
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />

      {error && (
        <span className="text-xs text-red-500 mt-0.5">{error}</span>
      )}
    </div>
  );
}
