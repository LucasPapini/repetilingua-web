import { api } from "@/lib/axios";
import type { SignInForm } from "@/pages/auth/sing-in";

interface SignInResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export async function signInRequest(data: SignInForm): Promise<SignInResponse> {
  const params = new URLSearchParams();

  params.append('username', data.email);
  params.append('password', data.password);
  params.append('grant_type', 'password');

  const clientCredentials = btoa(
    `${import.meta.env.VITE_API_CLIENT_ID}:${import.meta.env.VITE_API_CLIENT_SECRET}`,
  );

  const response = await api.post<SignInResponse>('/oauth2/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${clientCredentials}`,
    },
  });

  return response.data;
}
