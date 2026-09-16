import { api } from '@/lib/axios'

export interface UploadAudio {
  formData: FormData
}
export async function createNewAudioPartText(params: UploadAudio) {
  const response = await api.post('/texts-parts/upload', params, {
    headers: {
      // Força este endpoint específico a usar multipart/form-data.
      // O Axios/Navegador vai preencher o boundary automaticamente.
      'Content-Type': 'multipart/form-data',
    }
  });
  return response.data
}
