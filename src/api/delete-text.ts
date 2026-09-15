import { api } from "@/lib/axios"

export interface DeleteAnText {
  id: number;
}

export async function deleteAnText(id: DeleteAnText) {
  await api.delete(`/texts/${id}`)
}
