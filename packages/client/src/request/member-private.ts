import { HttpMethod } from "@/constants/http-method";
import { useFetch } from "@/hooks/use-fetch";
import useDynamicFetch from "@/hooks/use-dynamic-fetch";
import { useMutation } from "@/hooks/use-mutation";
import useDynamicMutation from "@/hooks/use-dynamic-mutation";
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
} from "@/schemas/member";

type MemberUUID = string;
type MemberUUIDParam = { memberUUID: MemberUUID };

type SkillUUID = string;

export const usePrivateCreateMember = () => {
  return useMutation<MemberResponse, CreateMember>(
    HttpMethod.POST,
    "/admin/members"
  );
};

export const usePrivateMemberList = () => {
  return useFetch<MemberListResponse>("/admin/members");
};

export const usePrivateMember = () => {
  return useDynamicFetch<MemberResponse, MemberUUIDParam>(
    ({ memberUUID }) => `/admin/members/${memberUUID}`
  );
};

export const usePrivateUpdateMember = () => {
  return useDynamicMutation<MemberResponse, MemberUUIDParam, UpdateMember>(
    ({ memberUUID }) => `/admin/members/${memberUUID}`,
    HttpMethod.PATCH
  );
};

export const usePrivateUpdateMemberProfileImage = () => {
  return useDynamicMutation<unknown, MemberUUIDParam, FormData>(
    ({ memberUUID }) => `/admin/members/${memberUUID}/profile`,
    HttpMethod.PATCH,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};

export const usePrivateDeleteMemberProfileImage = () => {
  return useDynamicMutation<unknown, MemberUUIDParam, unknown>(
    ({ memberUUID }) => `/admin/members/${memberUUID}/profile`,
    HttpMethod.DELETE
  );
};

export const usePrivateCreateMemberLink = () => {
  return useDynamicMutation<MemberLinkResponse, MemberUUIDParam, MemberLink>(
    ({ memberUUID }) => `/admin/members/${memberUUID}/links`,
    HttpMethod.POST
  );
};

export const usePrivateUpdateMemberLink = () => {
  return useDynamicMutation<
    MemberLinkResponse,
    { memberUUID: MemberUUID; linkUUID: string },
    UpdateMemberLink
  >(
    ({ memberUUID, linkUUID }) =>
      `/admin/members/${memberUUID}/links/${linkUUID}`,
    HttpMethod.PATCH
  );
};

export const usePrivateDeleteMemberLink = () => {
  return useDynamicMutation<
    MemberLinkResponse,
    { memberUUID: MemberUUID; linkUUID: string },
    unknown
  >(
    ({ memberUUID, linkUUID }) =>
      `/admin/members/${memberUUID}/links/${linkUUID}`,
    HttpMethod.DELETE
  );
};

export const usePrivateCreateMemberSkill = () => {
  return useDynamicMutation<
    MemberSkillResponse,
    MemberUUIDParam,
    MemberSkillRequest
  >(({ memberUUID }) => `/admin/members/${memberUUID}/skills`, HttpMethod.POST);
};

export const usePrivateUpdateMemberSkill = () => {
  return useDynamicMutation<
    MemberSkillResponse,
    { memberUUID: MemberUUID; skillUUID: SkillUUID },
    UpdateMemberSkill
  >(
    ({ memberUUID, skillUUID }) =>
      `/admin/members/${memberUUID}/skills/${skillUUID}`,
    HttpMethod.PATCH
  );
};

export const usePrivateDeleteMemberSkill = () => {
  return useDynamicMutation<
    MemberResponse,
    { memberUUID: MemberUUID; skillUUID: SkillUUID },
    unknown
  >(
    ({ memberUUID, skillUUID }) =>
      `/admin/members/${memberUUID}/skills/${skillUUID}`,
    HttpMethod.DELETE
  );
};
