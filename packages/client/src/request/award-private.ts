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

export const useAwardList = () => {
  return useFetch<AwardListResponse>('/admin/portfolio/awards');
};

export const useCreateAward = () => {
  return useMutation<unknown, CreateAward>(
    HttpMethod.POST,
    '/admin/portfolio/awards'
  );
};

export const useCreateAwardWithoutUUID = () => {
  return useMutation<unknown, CreateAwardWithoutUUID>(
    HttpMethod.POST,
    '/admin/portfolio/awards'
  );
};

export const useDeleteAward = (awardUUID: AwardUUID) => {
  return useMutation<unknown, unknown>(
    HttpMethod.DELETE,
    `/admin/portfolio/awards/${awardUUID}`
  );
};

export const useCreateAwardMember = (awardUUID: AwardUUID) => {
  return useMutation<unknown, CreateAwardMember>(
    HttpMethod.POST,
    `/admin/portfolio/awards/${awardUUID}/members`
  );
};

export const useDeleteAwardMember = (
  awardUUID: AwardUUID,
  memberId: string
) => {
  return useMutation<unknown, unknown>(
    HttpMethod.DELETE,
    `/admin/portfolio/awards/${awardUUID}/members/${memberId}`
  );
};

export const useCompetitionList = () => {
  return useFetch<CompetitionListResponse>('/admin/portfolio/competitions');
};

export const useCompetitionAwardList = (competitionUUID: CompetitionUUID) => {
  return useFetch<CompetitionAwardListResponseSchema>(
    `/admin/portfolio/competitions/${competitionUUID}`
  );
};

export const useDeleteCompetition = (competitionUUID: CompetitionUUID) => {
  return useMutation<unknown, unknown>(
    HttpMethod.DELETE,
    `/admin/portfolio/competitions/${competitionUUID}`
  );
};
