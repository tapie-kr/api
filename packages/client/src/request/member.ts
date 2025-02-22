import { HttpMethod } from '@/constants/http-method';
import { PublicMemberQueryKeys } from '@/constants/query-keys/member';
import { useQuery } from '@/hooks/use-query';
import { PublicMemberListResponse } from '@/schemas/member';

export const usePublicMemberList = () => {
  useQuery<PublicMemberListResponse>(PublicMemberQueryKeys.MEMBER_LIST, {
    method: HttpMethod.GET,
    url:    '/v1/members',
  });
};
