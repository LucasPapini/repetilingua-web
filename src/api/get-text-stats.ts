import { api } from "@/lib/axios"

interface Stats {
  totalTexts: number | null
  totalTextParts: number | null
  completedStudies: number | null
  listenAndReadCount: number | null
  listenOnlyCount: number | null
  totalRepetitions: number | null
}

export async function getStats(): Promise<Stats> {
  const respose = await api.get<Stats>('/dashboard/stats')
  return respose.data
}
