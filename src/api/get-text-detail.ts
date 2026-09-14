import { api } from '@/lib/axios'

interface TextDetailProps {
  textId: number
  title: string
  totalParts: number
  completedParts: number
  overallProgress: number
  totalRepetitions: number
  lastActivity: string // ISO date string
  module: string
}

export async function getTextDetail(idText: number): Promise<TextDetailProps> {
  const response = await api.get(`/texts/${idText}`)
  return response.data;
}
