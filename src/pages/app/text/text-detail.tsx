import { getTextStats } from "@/api/get-text-detail-stats"
import { getPartStats } from "@/api/get-text-part-stats"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Modal } from "@/components/ui/modal"
import { Table } from "@/pages/app/text/components/table-card"
import { TextDetailCard } from "@/pages/app/text/components/text-detail-card"
import { Title } from "@/components/ui/title"
import { tableTextDetail } from "@/data/table-text-detail"
import { isNotEmpty } from "@/helpers/not-empty"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { createNewAudioPartText } from "@/api/post-create-new-audio-part-text"
import { createNewTextPart } from "@/api/post-create-new-part-text"

// Tamanho máximo do arquivo de áudio: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_AUDIO_TYPES = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a'];

const createNewPartSchema = z.object({
  partNumber: z.string().min(1, 'O número da parte deve ser no mínimo 1'),
  content: z
    .string()
    .min(3, 'O conteúdo do parágrafo precisa ter no mínimo 3 caracteres'),
  audio: z
    .custom<FileList>()
    .refine((files) => files?.length > 0, 'O arquivo de áudio é obrigatório.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      'O tamanho máximo do áudio é de 10MB.'
    )
    .refine(
      (files) => ACCEPTED_AUDIO_TYPES.includes(files?.[0]?.type),
      'Formato inválido. Envie um arquivo MP3, WAV ou M4A.'
    ),
})
export type CreateNewPartFormData = z.infer<typeof createNewPartSchema>
export function TextDetail() {
  const queryClient = useQueryClient();
  const [isNewParagraphOpen, setIsNewParagraphOpen] = useState(false)
  const { id } = useParams()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateNewPartFormData>({
    resolver: zodResolver(createNewPartSchema),
    defaultValues: {
      partNumber: undefined,
      content: '',
      audio: undefined,
    },
  });
  const { data: textDetailStats, isLoading: isLoadingTextDetail } = useQuery({
    queryKey: ['texts-detail', id],
    queryFn: () => getTextStats(Number(id)),
    enabled: !!id,
    retry: false
  })
  const { data: textPartStas, isLoading: isLoadingTextPartStats } = useQuery({
    queryKey: ['text-parts-stats', id],
    queryFn: () => getPartStats(Number(id))
  })
  const { mutateAsync: newAudioFn } = useMutation({
    mutationFn: createNewAudioPartText
  })
  const { mutateAsync: createNewTextPartFn } = useMutation({
    mutationFn: createNewTextPart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['text-parts-stats'] });
      queryClient.invalidateQueries({ queryKey: ['texts-detail'] });
    }
  })

  useEffect(() => {
    if (isNewParagraphOpen) {
      reset({
        partNumber: undefined,
        content: '',
        audio: undefined,
      })
    }
  }, [isNewParagraphOpen, reset])

  async function handleCreatePart(data: CreateNewPartFormData) {
    try {
      const formData = new FormData()
      formData.append('file', data.audio[0])
      formData.append('textId', String(id))
      const audioPath = await newAudioFn(formData)
      const textPart = {
        partNumber: data.partNumber,
        content: data.content,
        textId: Number(id),
        audioPath
      }
      await createNewTextPartFn({ textPart })
      // Toast de Sucesso
      toast.success('Cadastro realizado com sucesso!');
      setIsNewParagraphOpen(false);
      reset()
    } catch (error) {
      // Toast de Erro
      toast.error('Falha ao cadastrar novo Paragrafo', {
        description: error?.message,
      });
      console.error('Error ao fazer o login. Error:: ', error)
    }
  }

  if (isLoadingTextDetail && isLoadingTextPartStats) {
    return <LoadingSpinner />
  }

  return (
    <>
      <div className="w-full max-w-full overflow-hidden">
        <Link
          to={`/app/texts`}
          className="mb-5 flex items-center gap-1 text-sm text-gray-500"
        >
          <ArrowLeft size={20} /> Voltar
        </Link>

        {isNotEmpty(textDetailStats) ? (
          <div className="flex flex-col gap-4 w-full">
            <Title title={textDetailStats?.title || ""} className="text-4xl font-bold tracking-tight text-brand-primary-deep" />
            <span className="font-bold text-gray-300">{textDetailStats?.modulo}</span>
            <TextDetailCard
              id={textDetailStats?.textId || ''}
              icon="BookOpen"
              totalParts={textDetailStats?.totalParts || ''}
              subtitle="total de partes cadastradas"
            />
            <TextDetailCard
              id={textDetailStats?.textId || ''}
              totalParts={textDetailStats?.completedParts || '0'}
              icon="CheckCircle"
              subtitle="total de partes concluídas"
              variant="green"
            />

            <TextDetailCard
              id={textDetailStats?.textId || ''}
              totalParts={textDetailStats?.totalRepetitions || '0'}
              icon="RefreshCw"
              subtitle="total de repetições neste texto"
              variant="orange"
            />

            <TextDetailCard
              id={textDetailStats?.textId || ''}
              totalParts={'0'}
              icon="Clock"
              subtitle="última atividade"
              variant="red"
            />

            <div className="flex justify-between gap-10 items-center mt-3 mb-3">
              <Title title="Parágrafos" />
              <Button
                type="submit"
                variant="secondary"
                onClick={() => setIsNewParagraphOpen(true)}
              >
                Novo Parágrafo
              </Button>
            </div>

            <Table
              columns={tableTextDetail}
              data={textPartStas}
              idDoTexto={id}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex w-full items-center justify-between mt-3 gap-10">
              <Title title="Parágrafos" />
              <Button
                type="submit"
                variant="secondary"
                onClick={() => setIsNewParagraphOpen(true)}
              >
                Novo Parágrafo
              </Button>
            </div>
            <p className="border rounded-md border-gray-200 px-4 py-8 text-center text-sm text-brand-primary-navy/60 border-dashed">
              Nenhum parágrafo encontrado para este texto.
            </p>
          </div>
        )}
      </div>

      {/* Componente Modal */}
      <Modal
        isOpen={isNewParagraphOpen}
        onClose={() => setIsNewParagraphOpen(false)}
        title="Cadastrar Novo Parágrafo"
        description="Preencha o conteúdo do parágrafo em inglês."
      >
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreatePart)}>
          <div>
            <Input
              type="text"
              label="Qual paragrafo"
              error={errors.partNumber?.message}
              {...register('partNumber')}
            />
          </div>

          <div>
            <label htmlFor="content" className="text-sm font-semibold text-brand-primary-navy ">Conteúdo</label>
            <textarea
              id="content"
              className="w-full px-3.5 py-2.5
          bg-brand-container border border-brand-surface-base rounded-lg
          text-brand-primary-navy placeholder:text-zinc-500 text-sm
          outline-none transition-colors
          focus:brand-primary-navy focus:ring-1 focus:brand-primary-navy
          disabled:opacity-50 disabled:cursor-not-allowed"
              {...register('content')}
            ></textarea>
          </div>

          <div>
            <Input
              label="Audio"
              type="file"
              accept="audio/*"
              id="audio"
              error={errors.audio?.message}
              {...register('audio')}
            />
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <Button
              type="button"
              variant="danger_outline"
              onClick={() => setIsNewParagraphOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="secondary"
              isLoading={isSubmitting}
            >
              Salvar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
