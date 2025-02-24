import { useFetch } from '@/hooks/use-fetch';
import { PublicAwardListResponse } from '@/schemas/award';

export const usePublicAwardList = () => {
  return useFetch<PublicAwardListResponse>('/portfolio/awards');
};
