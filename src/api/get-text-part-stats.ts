import { api } from '@/lib/axios'

export interface TextPartStatsProps {
  content: {
    audioPath: string
    completedParts: number
    content: string
    partNumber: number
    textPartId: number
    totalRepetitions: number
  }[]
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
}

export async function getPartStats(idText: number): Promise<TextPartStatsProps> {
  const response = await api.get(`/texts-parts/${idText}/stats?pageIndex=0`)
  return response.data;
}
