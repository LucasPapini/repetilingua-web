import { forwardRef, type ComponentProps } from 'react';

export interface SelectOption {
  label: string;
  value: string | number | boolean;
}

interface SelectProps extends ComponentProps<'select'> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = '', id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-semibold text-brand-primary-navy"
          >
            {label}
          </label>
        )}

        <select
          id={id}
          ref={ref}
          className={`w-full px-3.5 py-2.5
            bg-brand-container border border-brand-surface-base rounded-lg
            text-brand-primary-navy placeholder:text-zinc-500 text-sm
            outline-none transition-colors
            focus:ring-1 focus:ring-brand-primary-navy
            disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-red-500' : ''
            } ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <span className="text-xs text-red-500 mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
