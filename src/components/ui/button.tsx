import type { ComponentProps } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {

  // Mapeamento visual das variações
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-brand-primary-navy border border-transparent hover:bg-white hover:border-brand-primary-navy hover:text-brand-primary-navy text-white font-medium',
    secondary: 'bg-brand-primary-deep border border-transparent hover:bg-white hover:border-brand-primary-deep hover:text-brand-primary-deep text-white font-medium',
    outline: 'border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-medium'
  };

  return <button
    disabled={disabled || isLoading}
    className={`
        w-full px-4 py-2.5 rounded-lg text-sm transition-all
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98]
        cursor-pointer
        ${variants[variant]}
        ${className}
      `}
    {...props}
  >
    {isLoading ? (
      <span className="animate-pulse">Carregando...</span>
    ) : (
      children
    )}
  </button>
}
