// src/components/ui/loading-spinner.tsx
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  text?: string;
}

export function LoadingSpinner({
  size = 32,
  className = "",
  text,
}: LoadingSpinnerProps) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 p-6 h-full ${className}`}>
      <Loader2
        size={size}
        className="animate-spin text-brand-primary-deep"
      />
      {text && (
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-academic-gold">
          {text}
        </span>
      )}
    </div>
  );
}
