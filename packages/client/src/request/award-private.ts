import { HttpMethod } from '@/constants/http-method';
import useDynamicFetch from '@/hooks/use-dynamic-fetch';
import useDynamicMutation from '@/hooks/use-dynamic-mutation';
import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';
import {
  AwardListResponse,
  CompetitionAwardListResponseSchema,
  CompetitionListResponse,
  CreateAward,
  CreateAwardMember,
  CreateAwardWithoutUUID,
} from '@/schemas/award';

type AwardUUID = string;

type CompetitionUUID = string;

export const usePrivateAwardList = () => {
  return useFetch<AwardListResponse>('/admin/portfolio/awards');
};

export const usePrivateCreateAward = () => {
  return useMutation<unknown, CreateAward>(
    HttpMethod.POST,
    '/admin/portfolio/awards',
  );
};

export const usePrivateCreateAwardWithoutUUID = () => {
  return useMutation<unknown, CreateAwardWithoutUUID>(
    HttpMethod.POST,
    '/admin/portfolio/awards',
  );
};

export const usePrivateDeleteAward = () => {
  return useDynamicMutation<unknown, { awardId: AwardUUID }, unknown>(
    ({ awardId }) => `/admin/portfolio/awards/${awardId}`,
    HttpMethod.DELETE,
  );
};

export const usePrivateCreateAwardMember = () => {
  return useDynamicMutation<unknown, { awardId: AwardUUID }, CreateAwardMember>(
    ({ awardId }) => `/admin/portfolio/awards/${awardId}/members`,
    HttpMethod.POST,
  );
};

export const usePrivateDeleteAwardMember = () => {
  return useDynamicMutation<
    unknown,
    { awardId: AwardUUID; memberId: string },
    unknown
  >(
    ({ awardId, memberId }) =>
      `/admin/portfolio/awards/${awardId}/members/${memberId}`,
    HttpMethod.DELETE,
  );
};

export const usePrivateCompetitionList = () => {
  return useFetch<CompetitionListResponse>('/admin/portfolio/competitions');
};

export const usePrivateCompetitionAwardList = () => {
  return useDynamicFetch<
    CompetitionAwardListResponseSchema,
    { competitionId: string }
  >(
    ({ competitionId }) =>
      `/admin/portfolio/competitions/${competitionId}/awards`,
  );
};

export const usePrivateDeleteCompetition = () => {
  return useDynamicMutation<
    unknown,
    { competitionId: CompetitionUUID },
    unknown
  >(
    ({ competitionId }) => `/admin/portfolio/competitions/${competitionId}`,
    HttpMethod.DELETE,
  );
};
