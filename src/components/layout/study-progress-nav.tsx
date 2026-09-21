import { useState, useEffect } from "react";
import { AudioWaveform, Ear, Mic } from "lucide-react";

export interface ProgressData {
  d1ReadListen?: number | null;
  d1ListenOnly?: number | null;
  d1FinalCheck?: number | null;
  d2ReadListen?: number | null;
  d2ListenOnly?: number | null;
  d2FinalCheck?: number | null;
}

export type ProgressStage =
  | 'D1_READ_LISTEN'
  | 'D1_LISTEN_ONLY'
  | 'D1_FINAL_CHECK'
  | 'D2_READ_LISTEN'
  | 'D2_LISTEN_ONLY'
  | 'D2_FINAL_CHECK';

interface StudyProgressNavProps {
  currentDay: number;
  data?: ProgressData;
  handleProgressClick: (data: ProgressData | undefined, stage: ProgressStage) => void;
}

export function StudyProgressNav({
  currentDay,
  data,
  handleProgressClick,
}: StudyProgressNavProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Efeito Auto-Hide ao rolar a página para baixo
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Valores de progresso com fallback para 0
  const d1ReadListen = data?.d1ReadListen ?? 0;
  const d1ListenOnly = data?.d1ListenOnly ?? 0;
  const d1FinalCheck = data?.d1FinalCheck ?? 0;

  const d2ReadListen = data?.d2ReadListen ?? 0;
  const d2ListenOnly = data?.d2ListenOnly ?? 0;
  const d2FinalCheck = data?.d2FinalCheck ?? 0;

  // Validação das travas de conclusão da etapa anterior (Meta de 20 repetições)
  const d1ReadListenComplete = d1ReadListen >= 20;
  const d1ListenOnlyComplete = d1ListenOnly >= 20;

  const d2ReadListenComplete = d2ReadListen >= 20;
  const d2ListenOnlyComplete = d2ListenOnly >= 20;

  // Seleção dos dados com base no dia ativo
  const stageData =
    currentDay === 1
      ? [
        {
          stage: 'D1_READ_LISTEN' as ProgressStage,
          progress: d1ReadListen,
          disabled: false || d1ReadListen >= 20,
          bgColor: 'bg-brand-primary-deep',
          icon: <AudioWaveform color="white" size={22} />,
          title: 'Leitura + Escuta',
        },
        {
          stage: 'D1_LISTEN_ONLY' as ProgressStage,
          progress: d1ListenOnly,
          disabled: !d1ReadListenComplete || d1ListenOnly >= 20,
          bgColor: 'bg-brand-action-red',
          icon: <Ear color="white" size={22} />,
          title: 'Escuta',
        },
        {
          stage: 'D1_FINAL_CHECK' as ProgressStage,
          progress: d1FinalCheck,
          disabled: !d1ListenOnlyComplete || d1FinalCheck >= 20,
          bgColor: 'bg-brand-academic-gold',
          icon: <Mic color="white" size={22} />,
          title: 'Leitura + Escuta + Imitação',
        },
      ]
      : [
        {
          stage: 'D2_READ_LISTEN' as ProgressStage,
          progress: d2ReadListen,
          disabled: false || d2ReadListen >= 20,
          bgColor: 'bg-brand-primary-deep',
          icon: <AudioWaveform color="white" size={22} />,
          title: 'Leitura + Escuta',
        },
        {
          stage: 'D2_LISTEN_ONLY' as ProgressStage,
          progress: d2ListenOnly,
          disabled: !d2ReadListenComplete || d2ListenOnly >= 20,
          bgColor: 'bg-brand-action-red',
          icon: <Ear color="white" size={22} />,
          title: 'Escuta',
        },
        {
          stage: 'D2_FINAL_CHECK' as ProgressStage,
          progress: d2FinalCheck,
          disabled: !d2ListenOnlyComplete || d2FinalCheck >= 20,
          bgColor: 'bg-brand-academic-gold',
          icon: <Mic color="white" size={22} />,
          title: 'Leitura + Escuta + Imitação',
        },
      ];

  return (
    <div
      className={`
        fixed z-50 right-0 sm:bottom-4 bottom-16 h-16 w-2xs flex items-center rounded-l-xl
        shadow-xl transition-transform duration-300 ease-in-out overflow-hidden
        ${isVisible ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {stageData.map((item) => (
        <button
          key={item.stage}
          type="button"
          disabled={item.disabled}
          onClick={() => handleProgressClick(data, item.stage)}
          title={`${item.title} (${item.progress}/20)`}
          className={`
            relative flex justify-center items-center w-full h-full ${item.bgColor}
            transition-all duration-200
            ${item.disabled
              ? "opacity-50 cursor-not-allowed grayscale-[0.3]"
              : "cursor-pointer hover:brightness-110 active:scale-95"
            }
          `}
        >
          {/* Badge circular com a contagem atual das repetições */}
          <span className="absolute -top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white shadow-md border border-slate-700">
            {item.progress}
          </span>

          {/* Ícone da Etapa */}
          {item.icon}
        </button>
      ))}
    </div>
  );
}
