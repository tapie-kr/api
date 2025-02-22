import { useQueryClient } from '@tanstack/react-query';
import { HttpMethod } from '@/constants/http-method';
import { AwardQueryKeys } from '@/constants/query-keys/award';
import { PrivateAwardQueryKeys } from '@/constants/query-keys/award-private';
import { useMutation } from '@/hooks/use-mutation';
import { useQuery } from '@/hooks/use-query';
import {
  AwardListResponse,
  CompetitionAwardListResponseSchema,
  CompetitionListResponse,
  CreateAward,
  CreateAwardMember,
  CreateAwardWithoutUUID,
  PublicAwardListResponse,
} from '@/schemas/award';

type AwardUUID = string;

type CompetitionUUID = string;

export const usePublicAwardList = () => {
  return useQuery<PublicAwardListResponse>(AwardQueryKeys.AWARD_LIST_PUBLIC, {
    method: HttpMethod.GET,
    url:    '/v1/portfolio/awards',
  });
};

export const useAwardList = () => {
  return useQuery<AwardListResponse>(PrivateAwardQueryKeys.AWARDS, {
    method: HttpMethod.GET,
    url:    '/v1/admin/portfolio/awards',
  });
};

export const useCreateAward = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, CreateAward>({
    method: HttpMethod.POST,
    url:    '/v1/admin/portfolio/awards',
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateAwardQueryKeys.AWARDS });
    },
    onError: error => {
      console.error('Error creating award:', error);
    },
  });
};

export const useCreateAwardWithoutUUID = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, CreateAwardWithoutUUID>({
    method: HttpMethod.POST,
    url:    '/v1/admin/portfolio/awards',
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateAwardQueryKeys.AWARDS });
    },
    onError: error => {
      console.error('Error creating award:', error);
    },
  });
};

export const useDeleteAward = (awardUUID: AwardUUID) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown>({
    method: HttpMethod.DELETE,
    url:    `/v1/admin/portfolio/awards/${awardUUID}`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateAwardQueryKeys.AWARDS });

      queryClient.invalidateQueries({ queryKey: PrivateAwardQueryKeys.AWARD_DETAIL(awardUUID) });
    },
    onError: error => {
      console.error('Error deleting award:', error);
    },
  });
};

export const useCreateAwardMember = (awardUUID: AwardUUID) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, CreateAwardMember>({
    method: HttpMethod.POST,
    url:    `/v1/admin/portfolio/awards/${awardUUID}/members`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateAwardQueryKeys.AWARD_MEMBERS(awardUUID) });

      queryClient.invalidateQueries({ queryKey: PrivateAwardQueryKeys.AWARD_DETAIL(awardUUID) });
    },
    onError: error => {
      console.error('Error creating award member:', error);
    },
  });
};

export const useDeleteAwardMember = (awardUUID: AwardUUID,
  memberId: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown>({
    method: HttpMethod.DELETE,
    url:    `/v1/admin/portfolio/awards/${awardUUID}/members/${memberId}`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateAwardQueryKeys.AWARD_MEMBERS(awardUUID) });

      queryClient.invalidateQueries({ queryKey: PrivateAwardQueryKeys.AWARD_DETAIL(awardUUID) });
    },
    onError: error => {
      console.error('Error deleting award member:', error);
    },
  });
};

export const useCompetitionList = () => {
  return useQuery<CompetitionListResponse>(PrivateAwardQueryKeys.COMPETITIONS, {
    method: HttpMethod.GET,
    url:    '/v1/admin/portfolio/competitions',
  });
};

export const useCompetitionAwardList = (competitionUUID: CompetitionUUID) => {
  return useQuery<CompetitionAwardListResponseSchema>(PrivateAwardQueryKeys.COMPETITION_AWARDS(competitionUUID),
    {
      method: HttpMethod.GET,
      url:    `/v1/admin/portfolio/competitions/${competitionUUID}`,
    });
};

export const useDeleteCompetition = (competitionUUID: CompetitionUUID) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown>({
    method: HttpMethod.DELETE,
    url:    `/v1/admin/portfolio/competitions/${competitionUUID}`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateAwardQueryKeys.COMPETITIONS });

      queryClient.invalidateQueries({ queryKey: PrivateAwardQueryKeys.COMPETITION_AWARDS(competitionUUID) });
    },
    onError: error => {
      console.error('Error deleting competition:', error);
    },
  });
};
