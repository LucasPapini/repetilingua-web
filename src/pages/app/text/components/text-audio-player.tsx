import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAudio } from "@/api/get-audio";


interface AudioPlayerProps {
  audioPath?: string;
}

export function AudioPlayer({ audioPath }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  // 1. TanStack Query cuida da requisição autenticada
  const { data: audioBlob, isError, isLoading } = useQuery({
    queryKey: ["audio", audioPath],
    queryFn: () => getAudio(audioPath!),
    enabled: !!audioPath, // Só executa se o audioPath existir
  });

  // 2. Transforma o Blob em ObjectURL quando a query responder
  useEffect(() => {
    if (!audioBlob) return;

    const url = URL.createObjectURL(audioBlob);
    setBlobUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [audioBlob]);

  async function togglePlay() {
    if (!audioRef.current || !blobUrl || isError) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Erro ao tocar áudio:", error);
      setIsPlaying(false);
    }
  }

  function handleRestart() {
    if (!audioRef.current || !blobUrl || isError) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  }

  return (
    <div className="mt-5 flex items-center gap-4 rounded-xl border border-brand-container-highest bg-brand-container-low p-4 shadow-sm">
      {blobUrl && (
        <audio
          ref={audioRef}
          src={blobUrl}
          onEnded={() => setIsPlaying(false)}
        />
      )}

      <Button
        type="button"
        onClick={togglePlay}
        disabled={!blobUrl || isLoading || isError}
        variant="secondary"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={handleRestart}
        disabled={!blobUrl || isLoading || isError}
      >
        <RotateCcw size={18} />
      </Button>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-brand-primary-navy">
          Ouvir Parágrafo
        </span>
        <span className="text-xs text-brand-primary-navy/70">
          {isError
            ? "Erro ao carregar o áudio"
            : isLoading
              ? "Carregando áudio..."
              : isPlaying
                ? "Reproduzindo..."
                : "Pausado"}
        </span>
      </div>
    </div>
  );
}
