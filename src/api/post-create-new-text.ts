import { api } from "@/lib/axios";

interface CreateNewTextRequest {
  module: string
  title: string
}

export async function createNewText(data: CreateNewTextRequest) {
  await api.post(`/texts`, {
    module: data.module,
    title: data.title
  })
}
