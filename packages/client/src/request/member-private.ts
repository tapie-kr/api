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

export const usePrivateCreateMember = () => {
  return useMutation<MemberResponse, CreateMember>(
    HttpMethod.POST,
    '/admin/members',
  );
};

export const usePrivateMemberList = () => {
  return useFetch<MemberListResponse>('/admin/members');
};

export const usePrivateMember = (uuid: MemberUUID) => {
  return useFetch<MemberResponse>(`/admin/members/${uuid}`);
};

export const usePrivateUpdateMember = (uuid: MemberUUID) => {
  return useMutation<MemberResponse, UpdateMember>(
    HttpMethod.PATCH,
    `/admin/members/${uuid}`,
  );
};

export const usePrivateUpdateMemberProfileImage = (memberUUID: MemberUUID) => {
  return useMutation<unknown, FormData>(
    HttpMethod.PATCH,
    `/admin/members/${memberUUID}/profile`,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
};

export const usePrivateDeleteMemberProfileImage = (memberUUID: MemberUUID) => {
  return useMutation<unknown>(
    HttpMethod.DELETE,
    `/admin/members/${memberUUID}/profile`,
  );
};

export const usePrivateCreateMemberLink = (memberUUID: MemberUUID) => {
  return useMutation<MemberLinkResponse, MemberLink>(
    HttpMethod.POST,
    `/admin/members/${memberUUID}/links`,
  );
};

export const usePrivateUpdateMemberLink = (
  memberUUID: MemberUUID,
  linkUUID: string,
) => {
  return useMutation<MemberLinkResponse, UpdateMemberLink>(
    HttpMethod.PATCH,
    `/admin/members/${memberUUID}/links/${linkUUID}`,
  );
};

export const usePrivateDeleteMemberLink = (
  memberUUID: MemberUUID,
  linkUUID: string,
) => {
  return useMutation<MemberLinkResponse>(
    HttpMethod.DELETE,
    `/admin/members/${memberUUID}/links/${linkUUID}`,
  );
};

export const usePrivateCreateMemberSkill = (memberUUID: MemberUUID) => {
  return useMutation<MemberSkillResponse, MemberSkillRequest>(
    HttpMethod.POST,
    `/admin/members/${memberUUID}/skills`,
  );
};

export const usePrivateUpdateMemberSkill = (
  memberUUID: MemberUUID,
  skillUUID: SkillUUID,
) => {
  return useMutation<MemberSkillResponse, UpdateMemberSkill>(
    HttpMethod.PATCH,
    `/admin/members/${memberUUID}/skills/${skillUUID}`,
  );
};

export const usePrivateDeleteMemberSkill = (
  memberUUID: MemberUUID,
  skillUUID: SkillUUID,
) => {
  return useMutation<MemberResponse>(
    HttpMethod.DELETE,
    `/admin/members/${memberUUID}/skills/${skillUUID}`,
  );
};
