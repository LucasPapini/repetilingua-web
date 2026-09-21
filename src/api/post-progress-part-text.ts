import { api } from '@/lib/axios'

interface PostProgressPartTextProps {
  textId: number | string | undefined
  textPartId: number | string | undefined
  field: string
}

export async function postProgressPartText({
  textId,
  textPartId,
  field,
}: PostProgressPartTextProps) {
  await api.post(`/texts-parts/part/${textPartId}/text/${textId}/progress?field=${field}`,
    null)
}
