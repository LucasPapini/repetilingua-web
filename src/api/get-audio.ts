import { api } from "@/lib/axios";

export async function getAudio(audioPath: string) {
  const response = await api.get(audioPath, {
    responseType: "blob",
  });
  return response.data; // Retorna diretamente o Blob
}
