import { getTextPartStudy } from "@/api/get-text-part-study";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Title } from "@/components/ui/title";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export function TextStudy() {
  const { textPartId, partNumber, idDoTexto } = useParams()
  const { data: partTextStudy, isLoading: isPartTextStudy } = useQuery({
    queryKey: ['texts-part-study', textPartId, partNumber],
    queryFn: () => getTextPartStudy(Number(textPartId), Number(partNumber))
  });
  if (isPartTextStudy) {
    return <LoadingSpinner />
  }
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
      <div className="w-full text-xl leading-relaxed font-normal tracking-wide text-pretty wrap-break-word antialiased mt-5">
        {isPartTextStudy
          ? 'Carregando...'
          : partTextStudy?.content
            ?.split('. ')
            .map((sentence, index) => (
              <p key={index} className="capitalize mb-3">{sentence.trim()}.</p>
            )) || '0'}
      </div>
    </div>
  );
}
