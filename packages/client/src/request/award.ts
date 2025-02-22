import { HttpMethod } from '@/constants/http-method';
import { AwardQueryKeys } from '@/constants/query-keys/award';
import { useQuery } from '@/hooks/use-query';
import {
  PublicAwardListResponse,
} from '@/schemas/award';

export const usePublicAwardList = () => {
  return useQuery<PublicAwardListResponse>(AwardQueryKeys.AWARD_LIST_PUBLIC, {
    method: HttpMethod.GET,
    url:    '/v1/portfolio/awards',
  });
};