import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  // Trata a tecla ESC para fechar o modal e previne o scroll da página
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop / Fundo escuro com blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Caixa do Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-xl border border-brand-container-highest bg-brand-surface-base p-6 shadow-xl transition-all">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-brand-primary-navy">
              {title}
            </h3>
            {description && (
              <p className="mt-2 text-sm text-brand-primary-navy/70">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-brand-primary-navy/60 hover:bg-brand-container-low hover:text-brand-primary-navy transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
