import { icons, type IconName } from "@/helpers/icon-helper";
import { useState, useEffect } from "react";
interface TextDetailCardProps {
  id: number | string;
  icon?: IconName;
  totalParts: number | string;
  subtitle: string;
  variant?: 'blue' | 'green' | 'violet' | 'orange' | 'red' | 'cyan';
}

const variants = {
  blue: {
    borderCard: 'border-l-blue-500',
    border: 'border-blue-500',
    iconBg: 'bg-blue-100',
    text: 'text-blue-500',
  },
  green: {
    borderCard: 'border-l-green-500',
    border: 'border-green-500',
    iconBg: 'bg-green-100',
    text: 'text-green-500',
  },
  orange: {
    borderCard: 'border-l-orange-500',
    border: 'border-orange-500',
    iconBg: 'bg-orange-100',
    text: 'text-orange-500',
  },
  red: {
    borderCard: 'border-l-red-500',
    border: 'border-red-500',
    iconBg: 'bg-red-100',
    text: 'text-red-500',
  },
}

export function TextDetailCard({ id, icon, totalParts, subtitle, variant = 'blue', }: TextDetailCardProps) {
  const selectedVariant = variants[variant];
  // Busca o componente do ícone no helper
  const IconComponent = icon ? icons[icon] : null;

  return (
    <div className={`flex flex-col gap-5 h-auto w-full border border-gray-300 rounded p-5 mt-3 ${selectedVariant.borderCard}`} key={id} >
      <div className="flex flex-1 justify-between">
        {IconComponent && (
          <div className={`flex h-10 w-10 items-center justify-center rounded-full p-1 ${selectedVariant.iconBg} ${selectedVariant.text} ${selectedVariant.border} border`}>
            <IconComponent size={20} className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </div>
        )}
        <div className="text-3xl font-semibold text-brand-primary-deep uppercase sm:mt-3 sm:text-2xl">{totalParts}</div>
      </div>
      {subtitle && (
        <div className="font-bold uppercase opacity-80 text-brand-primary-deep">{subtitle}</div>
      )}
    </div>
  )
}
