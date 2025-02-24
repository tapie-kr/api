import { useFetch } from '@/hooks/use-fetch';
import { PublicMemberListResponse } from '@/schemas/member';

export const useMemberList = () => {
  useFetch<PublicMemberListResponse>('/members');
};
