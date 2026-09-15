import { Search, X } from "lucide-react";
import { Select } from "@/components/ui/select"; // Seu Select base
import { Input } from "@/components/ui/input";   // Seu Input base

interface TextFiltersProps {
  title?: string;
  onTitleChange?: (value: string) => void;
  module?: string;
  onModuleChange?: (value: string) => void;
  completed?: string;
  onCompletedChange?: (value: string) => void;
  onClear?: () => void;
}

export function TextFilters({
  title,
  onTitleChange,
  module,
  onModuleChange,
  completed,
  onCompletedChange,
  onClear,
}: TextFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-brand-container-highest bg-brand-surface-base p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Busca por Título */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Buscar por título do texto..."
          className="w-full rounded-lg border border-brand-container-highest bg-brand-container-low pl-9 pr-4 py-2 text-sm text-brand-primary-navy placeholder:text-gray-400 outline-none transition-colors focus:border-brand-primary-navy focus:ring-1 focus:ring-brand-primary-navy"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Filtro de Módulo */}


        {/* Filtro de Conclusão */}


        {/* Botão de Limpar */}
        {(title || module || completed) && (
          <button
            type="button"
            onClick={onClear}
            className="flex h-9 items-center gap-1 rounded-lg px-2.5 text-xs font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Limpar
          </button>
        )}
      </div>
    </div>
  );
}
