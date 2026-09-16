import { api } from "@/lib/axios";

export interface TextPart {
  partNumber: number;
  content: string;
  textId: number;
  audioPath: string;
}

export interface CreateNewTextPartRequest {
  textPart: TextPart;
}

export async function createNewTextPart(data: CreateNewTextPartRequest) {
  const params = {
    pathNumber: data?.textPart.partNumber,
    textId: data?.textPart.textId,
    audioPath: data?.textPart.audioPath,
    content: data?.textPart.content
  }
  const response = await api.post('/texts-parts', params);
  return response.data;
}
