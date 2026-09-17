import { api } from "@/lib/axios"

export interface DeleteAnPartText {
  id: number;
}

export async function deleteAnPartText(id: DeleteAnPartText) {
  await api.delete(`/texts-parts/${id}`)
}
