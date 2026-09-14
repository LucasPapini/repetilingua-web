import { api } from "@/lib/axios";

interface TextDetailStatsProps {
  textId: number
  title: string
  totalParts: number
  completedParts: number
  overallProgress: number
  totalRepetitions: number
  lastActivity: string // ISO date string
  modulo: string
}

export async function getTextStats(
  idText: number,
): Promise<TextDetailStatsProps> {
  const response = await api.get(`/texts/${idText}/stats`)
  return response.data
}
