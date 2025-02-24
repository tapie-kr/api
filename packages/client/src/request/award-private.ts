import { HttpMethod } from '@/constants/http-method';
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
  return useMutation<unknown, CreateAward>(HttpMethod.POST,
    '/admin/portfolio/awards');
};

export const usePrivateCreateAwardWithoutUUID = () => {
  return useMutation<unknown, CreateAwardWithoutUUID>(HttpMethod.POST,
    '/admin/portfolio/awards');
};

export const usePrivateDeleteAward = (awardUUID: AwardUUID) => {
  return useMutation<unknown, unknown>(HttpMethod.DELETE,
    `/admin/portfolio/awards/${awardUUID}`);
};

export const usePrivateCreateAwardMember = (awardUUID: AwardUUID) => {
  return useMutation<unknown, CreateAwardMember>(HttpMethod.POST,
    `/admin/portfolio/awards/${awardUUID}/members`);
};

export const usePrivateDeleteAwardMember = (awardUUID: AwardUUID,
  memberId: string) => {
  return useMutation<unknown, unknown>(HttpMethod.DELETE,
    `/admin/portfolio/awards/${awardUUID}/members/${memberId}`);
};

export const usePrivateCompetitionList = () => {
  return useFetch<CompetitionListResponse>('/admin/portfolio/competitions');
};

export const usePrivateCompetitionAwardList = (competitionUUID: CompetitionUUID) => {
  return useFetch<CompetitionAwardListResponseSchema>(`/admin/portfolio/competitions/${competitionUUID}`);
};

export const usePrivateDeleteCompetition = (competitionUUID: CompetitionUUID) => {
  return useMutation<unknown, unknown>(HttpMethod.DELETE,
    `/admin/portfolio/competitions/${competitionUUID}`);
};
