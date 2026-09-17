import { getTextPartStudy } from "@/api/get-text-part-study";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Title } from "@/components/ui/title";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AudioPlayer } from "./components/text-audio-player";

export function TextStudy() {
  const { textPartId, partNumber, idDoTexto } = useParams()
  const { data: partTextStudy, isLoading: isPartTextStudy } = useQuery({
    queryKey: ['texts-part-study', textPartId, partNumber],
    queryFn: () => getTextPartStudy(Number(textPartId), Number(partNumber))
  });
  if (isPartTextStudy) {
    return <LoadingSpinner />
  }
  console.log("partTextStudy", partTextStudy)
  return (
    <div className="w-full max-w-full overflow-hidden">
      <Link
        to={`/app/texts/${idDoTexto}`}
        className="mb-5 flex items-center gap-1 text-sm text-gray-500"
      >
        <ArrowLeft size={20} /> Voltar
      </Link>
      <Title title={partTextStudy?.tituloText || ""} className="text-4xl font-bold tracking-tight text-brand-primary-deep" />
      <span className="font-bold text-gray-300 mt-3">
        Parte:{' '}{partTextStudy?.partNumber}</span>

      <AudioPlayer audioPath={partTextStudy?.audioPath || ""} />

      <div className="w-full text-xl leading-relaxed font-normal tracking-wide text-pretty wrap-break-word antialiased mt-5">
        {isPartTextStudy ? (
          'Carregando...'
        ) : (
          partTextStudy?.content
            ?.split(/\.\s*/) // Quebra em "." com/sem espaço OU em quebras de linha
            .map((sentence) => sentence.trim())
            .filter((sentence) => sentence.length > 0) // Remove entradas vazias
            .map((sentence, index) => (
              <p key={index} className="mb-5">
                {sentence.charAt(0).toUpperCase() + sentence.slice(1)}.
              </p>
            )) || 'Nenhum conteúdo disponível.'
        )}
      </div>
    </div>
  );
}
