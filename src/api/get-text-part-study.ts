import { api } from '@/lib/axios'

export interface PartTextStudyProps {
  tituloText: string | null
  textPartId: number | null
  partNumber: number | null
  content: string | null
  audioUrl: string | null
  d1ReadListen: number | null
  d1ListenOnly: number | null
  d1FinalCheck: number | null
  d2ReadListen: number | null
  d2ListenOnly: number | null
  d2FinalCheck: number | null
}

export async function getTextPartStudy(textPartId: number, partNumber: number,): Promise<PartTextStudyProps> {
  const response = await api.get(`/texts-parts/${textPartId}/part/${partNumber}/study`);

  return response.data;
}
