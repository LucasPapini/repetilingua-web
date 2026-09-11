import { icons, type IconName } from "@/helpers/icon-helper";

interface DashboardCardProps {
  title: string;
  value?: string | number | null;
  description?: string;
  icon?: IconName;
  variant?: 'blue' | 'green' | 'violet' | 'orange' | 'pink' | 'cyan';
}

const variants = {
  blue: {
    border: 'border-l-blue-500',
    iconBg: 'bg-blue-500',
  },

  green: {
    border: 'border-l-emerald-500',
    iconBg: 'bg-emerald-500',
  },

  violet: {
    border: 'border-l-violet-500',
    iconBg: 'bg-violet-500',
  },

  orange: {
    border: 'border-l-orange-500',
    iconBg: 'bg-orange-500',
  },

  pink: {
    border: 'border-l-pink-500',
    iconBg: 'bg-pink-500',
  },

  cyan: {
    border: 'border-l-cyan-500',
    iconBg: 'bg-cyan-500',
  },
};

export function DashboardCard({
  title,
  value,
  description,
  icon,
  variant = 'blue',
}: DashboardCardProps) {
  const selectedVariant = variants[variant];

  // Busca o componente do ícone no helper
  const IconComponent = icon ? icons[icon] : null;

  return (
    <div className={`flex flex-col justify-between gap-3 rounded-lg border border-brand-container-highest  bg-brand-surface-base p-5 shadow-sm ${selectedVariant.border} `} >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary-navy/70">
          {title}
        </span>

        {/* Renderiza apenas se IconComponent for um componente React válido */}
        {IconComponent && (
          <div className={`flex items-center justify-center rounded-md p-2 ${selectedVariant.iconBg}`}>
            <IconComponent size={20} className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
        )}
      </div>

      <div className="text-2xl font-bold tracking-tight text-brand-primary-navy">
        {value ?? "—"}
      </div>

      {
        description && (
          <p className="text-xs font-medium text-brand-academic-gold">
            {description}
          </p>
        )
      }
    </div >
  );
}
