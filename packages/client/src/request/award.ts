import { useFetch } from '@/hooks/use-fetch';
import { PublicAwardListResponse } from '@/schemas/award';

export const useAwardList = () => {
  return useFetch<PublicAwardListResponse>('/portfolio/awards');
};
