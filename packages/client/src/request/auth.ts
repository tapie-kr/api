import { HttpMethod } from '../constants/http-method';
import { AuthQueryKeys } from '../constants/query-keys';
import { useMutation } from '../hooks/use-mutation';
import { useQuery } from '../hooks/use-query';
import { apiRequest } from '../request';
import {
  GoogleCallbackResponse,
  MeResponse,
  RefreshTokenResponse,
} from '../schemas/auth';

type GoogleCallbackService = 'website' | 'form';

export function useGoogleLogin() {
  const version = process.env.API_VERSION || 'v1';
  const hostname = process.env.API_HOSTNAME || 'http://localhost:8877/';

  const baseURL = new URL(hostname);
  baseURL.pathname = `${version}/auth/google`;

  return { data: baseURL.toString() };
}

export const useRefreshToken = () => {
  return useMutation<unknown, RefreshTokenResponse>(
    {
      method: HttpMethod.POST,
      url: '/auth/refresh',
    },
    {
      onError: (error) => {
        console.error('Error refreshing token:', error);
      },
    },
  );
};

export const useMe = () => {
  return useQuery<MeResponse>(AuthQueryKeys.ME, {
    method: HttpMethod.GET,
    url: '/auth/me',
  });
};

export const googleCallback = (
  service: GoogleCallbackService,
  code: string,
) => {
  return apiRequest<GoogleCallbackResponse>({
    method: HttpMethod.GET,
    url: `/auth/google/callback?service=${service}&code=${code}`,
  });
};
