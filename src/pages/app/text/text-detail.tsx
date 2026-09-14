import { getTextStats } from "@/api/get-text-detail-stats"
import { getPartStats } from "@/api/get-text-part-stats"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Table } from "@/components/ui/table"
import { TextDetailCard } from "@/components/ui/text-detail-card"
import { Title } from "@/components/ui/title"
import { tableTextDetail } from "@/data/table-text-detail"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

export function TextDetail() {
  const { id } = useParams()
  const { data: textDetailStats, isLoading: isLoadingTextDetail } = useQuery({
    queryKey: ['texts-detail'],
    queryFn: () => getTextStats(Number(id))
  })
  const { data: textPartStas, isLoading: isLoadingTextPartStats } = useQuery({
    queryKey: ['text-parts-stats'],
    queryFn: () => getPartStats(Number(id))
  })

  if (isLoadingTextDetail) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Title title={textDetailStats?.title || ""} className="font text-4xl font-bold tracking-tight text-brand-primary-deep" />
      <span>{textDetailStats?.modulo}</span>

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

      <div className="grid grid-cols-2 justify-between items-center mt-3">
        <Title title="Paragrafos" />
        <Button
          type="submit"
          variant="secondary"
          className="mt-2"
        >
          Novo Paragrafo
        </Button>
      </div>
      <Table
        columns={tableTextDetail}
        data={textPartStas}
      />
    </>
  )
}
