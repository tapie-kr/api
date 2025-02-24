import { HttpMethod } from '@/constants/http-method';
import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';
import { apiRequest } from '@/request';
import {
  GoogleCallbackResponse,
  MeResponse,
  RefreshTokenResponse,
} from '@/schemas/auth';

type GoogleCallbackService = 'website' | 'form';

export function useGoogleLogin() {
  const version = process.env.API_VERSION || 'v1';
  const hostname = process.env.API_HOSTNAME || 'http://localhost:8877/';
  const baseURL = new URL(hostname);

  baseURL.pathname = `${version}/auth/google`;

  return { data: baseURL.toString() };
}

export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse>(HttpMethod.POST, '/auth/refresh');
};

export const useMe = () => {
  return useFetch<MeResponse>('/auth/me');
};

export const googleCallback = (
  service: GoogleCallbackService,
  code: string
) => {
  return useFetch<GoogleCallbackResponse>(
    `/auth/google/callback?service=${service}&code=${code}`
  );
};
