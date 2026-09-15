import { api } from "@/lib/axios";

interface UpdateTextRequest {
  id: number
  module: string
  title: string
  completed: boolean
}

export async function updateText({ id, module, title, completed }: UpdateTextRequest) {
  await api.put(`/texts/${id}`, {
    module,
    title,
    completed
  })
}
