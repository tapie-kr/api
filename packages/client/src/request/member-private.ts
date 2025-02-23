import { useQueryClient } from '@tanstack/react-query';
import { HttpMethod } from '@/constants/http-method';
import { PrivateMemberQueryKeys } from '@/constants/query-keys/member-private';
import { useMutation } from '@/hooks/use-mutation';
import { useQuery } from '@/hooks/use-query';
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
  const queryClient = useQueryClient();

  return useMutation<MemberResponse, CreateMember>({
    method: HttpMethod.POST,
    url:    '/v1/admin/members',
  },
  { onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.lists() });
  } });
};

export const useMemberList = () => {
  return useQuery<MemberListResponse>(PrivateMemberQueryKeys.lists(), {
    method: HttpMethod.GET,
    url:    '/v1/admin/members',
  });
};

export const useMember = (uuid: MemberUUID) => {
  return useQuery<MemberResponse>(PrivateMemberQueryKeys.detail(uuid), {
    method: HttpMethod.GET,
    url:    `/v1/admin/members/${uuid}`,
  });
};

export const useUpdateMember = (uuid: MemberUUID) => {
  const queryClient = useQueryClient();

  return useMutation<MemberResponse, UpdateMember>({
    method: HttpMethod.PATCH,
    url:    `/v1/admin/members/${uuid}`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.detail(uuid) });

      queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.lists() });
    },
    onError: error => {
      console.error('Error updating member:', error);
    },
  });
};

export const useUpdateMemberProfileImage = (memberUUID: MemberUUID) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, FormData>({
    method:  HttpMethod.PATCH,
    url:     `/v1/admin/members/${memberUUID}/profile`,
    headers: { 'Content-Type': 'multipart/form-data' },
  },
  { onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.profile(memberUUID) });
  } });
};

export const useDeleteMemberProfileImage = (memberUUID: MemberUUID) => {
  const queryClient = useQueryClient();

  return useMutation<unknown>({
    method: HttpMethod.DELETE,
    url:    `/v1/admin/members/${memberUUID}/profile`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.profile(memberUUID) });

      queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.detail(memberUUID) });
    },
    onError: error => {
      console.error('Error deleting member profile image:', error);
    },
  });
};

export const useCreateMemberLink = (memberUUID: MemberUUID) => {
  const queryClient = useQueryClient();

  return useMutation<MemberLinkResponse, MemberLink>({
    method: HttpMethod.POST,
    url:    `/v1/admin/members/${memberUUID}/links`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.links.all(memberUUID) });
    },
    onError: error => {
      console.error('Error creating member link:', error);
    },
  });
};

export const useUpdateMemberLink = (memberUUID: MemberUUID,
  linkUUID: string) => {
  const queryClient = useQueryClient();

  return useMutation<MemberLinkResponse, UpdateMemberLink>({
    method: HttpMethod.PATCH,
    url:    `/v1/admin/members/${memberUUID}/links/${linkUUID}`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.links.detail(memberUUID, linkUUID) });
    },
    onError: error => {
      console.error('Error updating member link:', error);
    },
  });
};

export const useDeleteMemberLink = (memberUUID: MemberUUID,
  linkUUID: string) => {
  const queryClient = useQueryClient();

  return useMutation<MemberLinkResponse>({
    method: HttpMethod.DELETE,
    url:    `/v1/admin/members/${memberUUID}/links/${linkUUID}`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.links.all(memberUUID) });
    },
    onError: error => {
      console.error('Error deleting member link:', error);
    },
  });
};

export const useCreateMemberSkill = (memberUUID: MemberUUID) => {
  const queryClient = useQueryClient();

  return useMutation<MemberSkillResponse, MemberSkillRequest>({
    method: HttpMethod.POST,
    url:    `/v1/admin/members/${memberUUID}/skills`,
  },
  { onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.skills.all(memberUUID) });
  } });
};

export const useUpdateMemberSkill = (memberUUID: MemberUUID,
  skillUUID: SkillUUID) => {
  const queryClient = useQueryClient();

  return useMutation<MemberSkillResponse, UpdateMemberSkill>({
    method: HttpMethod.PATCH,
    url:    `/v1/admin/members/${memberUUID}/skills/${skillUUID}`,
  },
  { onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.skills.detail(memberUUID, skillUUID) });
  } });
};

export const useDeleteMemberSkill = (memberUUID: MemberUUID,
  skillUUID: SkillUUID) => {
  const queryClient = useQueryClient();

  return useMutation<MemberResponse>({
    method: HttpMethod.DELETE,
    url:    `/v1/admin/members/${memberUUID}/skills/${skillUUID}`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PrivateMemberQueryKeys.skills.all(memberUUID) });
    },
    onError: error => {
      console.error('Error deleting member skill:', error);
    },
  });
};
