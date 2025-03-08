import { HttpMethod } from '@/constants/http-method';
import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';
import { MeResponse, RefreshTokenResponse } from '@/schemas/auth';

export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse>(HttpMethod.POST, '/auth/refresh');
};

export const useMe = () => {
  return useFetch<MeResponse>('/auth/me');
};
