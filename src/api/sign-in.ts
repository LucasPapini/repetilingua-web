import { api } from "@/lib/axios";
import type { SignInForm } from "@/pages/auth/sing-in";

interface SignInResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function signInRequest(data: SignInForm): Promise<SignInResponse> {
  const response = await api.post<SignInResponse>('/oauth2/token', data);
  return response.data;
}
