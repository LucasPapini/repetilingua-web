import { getTextStats } from "@/api/get-text-detail-stats"
import { getPartStats } from "@/api/get-text-part-stats"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Table } from "@/components/ui/table"
import { TextDetailCard } from "@/components/ui/text-detail-card"
import { Title } from "@/components/ui/title"
import { tableTextDetail } from "@/data/table-text-detail"
import { isNotEmpty } from "@/helpers/not-empty"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"

export function TextDetail() {
  const { id } = useParams()
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
              >
                Novo Parágrafo
              </Button>
            </div>

            <Table
              columns={tableTextDetail}
              data={textPartStas}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex w-full items-center justify-between mt-3 gap-10">
              <Title title="Parágrafos" />
              <Button
                type="submit"
                variant="secondary"
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
    </>
  )
}
