import { HttpMethod } from '@/constants/http-method';
import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';
import {
  CreateMember,
  MemberLink,
  MemberLinkResponse,
  MemberListResponse,
  MemberResponse,
  MemberSkillRequest,
  MemberSkillResponse,
  UpdateMember,
  UpdateMemberLink,
  UpdateMemberSkill,
} from '@/schemas/member';

type MemberUUID = string;

type SkillUUID = string;

export const useCreateMember = () => {
  return useMutation<MemberResponse, CreateMember>(HttpMethod.POST,
    '/v1/admin/members');
};

export const useMemberList = () => {
  return useFetch<MemberListResponse>('/v1/admin/members');
};

export const useMember = (uuid: MemberUUID) => {
  return useFetch<MemberResponse>(`/v1/admin/members/${uuid}`);
};

export const useUpdateMember = (uuid: MemberUUID) => {
  return useMutation<MemberResponse, UpdateMember>(HttpMethod.PATCH,
    `/v1/admin/members/${uuid}`);
};

export const useUpdateMemberProfileImage = (memberUUID: MemberUUID) => {
  return useMutation<unknown, FormData>(HttpMethod.PATCH,
    `/v1/admin/members/${memberUUID}/profile`,
    { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const useDeleteMemberProfileImage = (memberUUID: MemberUUID) => {
  return useMutation<unknown>(HttpMethod.DELETE,
    `/v1/admin/members/${memberUUID}/profile`);
};

export const useCreateMemberLink = (memberUUID: MemberUUID) => {
  return useMutation<MemberLinkResponse, MemberLink>(HttpMethod.POST,
    `/v1/admin/members/${memberUUID}/links`);
};

export const useUpdateMemberLink = (memberUUID: MemberUUID,
  linkUUID: string) => {
  return useMutation<MemberLinkResponse, UpdateMemberLink>(HttpMethod.PATCH,
    `/v1/admin/members/${memberUUID}/links/${linkUUID}`);
};

export const useDeleteMemberLink = (memberUUID: MemberUUID,
  linkUUID: string) => {
  return useMutation<MemberLinkResponse>(HttpMethod.DELETE,
    `/v1/admin/members/${memberUUID}/links/${linkUUID}`);
};

export const useCreateMemberSkill = (memberUUID: MemberUUID) => {
  return useMutation<MemberSkillResponse, MemberSkillRequest>(HttpMethod.POST,
    `/v1/admin/members/${memberUUID}/skills`);
};

export const useUpdateMemberSkill = (memberUUID: MemberUUID,
  skillUUID: SkillUUID) => {
  return useMutation<MemberSkillResponse, UpdateMemberSkill>(HttpMethod.PATCH,
    `/v1/admin/members/${memberUUID}/skills/${skillUUID}`);
};

export const useDeleteMemberSkill = (memberUUID: MemberUUID,
  skillUUID: SkillUUID) => {
  return useMutation<MemberResponse>(HttpMethod.DELETE,
    `/v1/admin/members/${memberUUID}/skills/${skillUUID}`);
};
