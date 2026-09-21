import { getTextPartStudy, type PartTextStudyProps } from "@/api/get-text-part-study";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Title } from "@/components/ui/title";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AudioPlayer } from "./components/text-audio-player";
import { StudyProgressNav, type ProgressData, type ProgressStage } from "@/components/layout/study-progress-nav";
import { toast } from "sonner";
import { postProgressPartText } from "@/api/post-progress-part-text";

export function TextStudy() {
  const { textPartId, partNumber, idDoTexto } = useParams()
  const { data: partTextStudy, isLoading: isPartTextStudy } = useQuery({
    queryKey: ['texts-part-study', textPartId, partNumber],
    queryFn: () => getTextPartStudy(Number(textPartId), Number(partNumber))
  });
  const queryClient = useQueryClient();

  const { mutateAsync: postProgressPartTextFn } = useMutation({
    mutationFn: postProgressPartText
  })

  if (isPartTextStudy) {
    return <LoadingSpinner />
  }

  const getCurrentDay = (data: PartTextStudyProps) => {
    const day1Complet =
      (data?.d1ReadListen ?? 0) >= 20 &&
      (data?.d1ListenOnly ?? 0) >= 20 &&
      (data?.d1FinalCheck ?? 0) >= 20

    return day1Complet ? 2 : 1
  }

  const currentDay = getCurrentDay(partTextStudy)

  const d1ReadListenComplete = (partTextStudy?.d1ReadListen ?? 0) >= 20
  const d1ListenOnlyComplete = (partTextStudy?.d1ListenOnly ?? 0) >= 20

  const d2ReadListenComplete = (partTextStudy?.d2ReadListen ?? 0) >= 20
  const d2ListenOnlyComplete = (partTextStudy?.d2ListenOnly ?? 0) >= 20

  /**
   * Registra o progresso de repetição para o estágio clicado.
   * @param data Dados atuais do progresso (opcional)
   * @param field Estágio de estudo (ex: 'D1_READ_LISTEN', 'D1_LISTEN_ONLY', etc.)
   */
  const handleProgressClick = async (
    data: ProgressData | undefined,
    field: ProgressStage
  ) => {
    try {
      const textId = idDoTexto
      const { textPartId } = partTextStudy
      // 1. Executa a chamada à API passando os IDs da rota/estado e o estágio clicado
      await postProgressPartTextFn({
        textId,
        textPartId,
        field, // Envia exatamente a chave esperada pelo enum/switch no backend
      })

      // 2. Notifica o usuário
      toast.success('Progresso registrado com sucesso!')

      // 3. Invalida as queries de estudo para que os contadores dos badges atualizem imediatamente
      queryClient.invalidateQueries({ queryKey: ['texts-part-study', textId, partNumber] })

    } catch (error) {
      toast.error('Erro ao salvar o progresso.')
      console.error('Erro ao registrar progresso: ', error)
    }
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

      <StudyProgressNav
        currentDay={currentDay}
        data={partTextStudy}
        handleProgressClick={handleProgressClick}
      />
    </div>
  );
}
