import { HttpMethod } from '@/constants/http-method';
import useDynamicFetch from '@/hooks/use-dynamic-fetch';
import useDynamicMutation from '@/hooks/use-dynamic-mutation';
import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';
import {
  CreateMember,
  DeleteMemberProfileImageResponse,
  MemberLink,
  MemberListResponse,
  MemberResponse,
  MemberSkillRequest,
  MemberSkillResponse,
  UpdateMember,
  UpdateMemberProfileImageResponse,
  UpdateMemberSkill,
} from '@/schemas/member';

type MemberSearchParam = { username: string };
type MemberUUIDParam = { memberUUID: string };
type MemberUUIDWithLinkParam = { memberUUID: string; linkUUID: string };
type MemberUUIDWithSkillParam = { memberUUID: string; skillUUID: string };

/**
 * 새 멤버 생성
 * @body {CreateMember} CreateMember
 * @returns {MemberResponse} MemberResponse
 */
export const usePrivateCreateMember = () => {
  return useMutation<MemberResponse, CreateMember>(
    HttpMethod.POST,
    '/admin/members'
  );
};

/**
 * 멤버 전체 리스트
 * @returns {MemberListResponse} MemberListResponse
 */
export const usePrivateMemberList = () => {
  return useFetch<MemberListResponse>('/admin/members');
};

/**
 * 멤버 겅색하기
 * @description (v1 버전은 username 검색만 가능)
 * @queryParam {string} username
 * @returns {MemberListResponse} MemberListResponse
 */
export const usePrivateMemberSearch = () => {
  return useDynamicFetch<MemberListResponse, MemberSearchParam>(
    ({ username }) => `/admin/members/search?username=${username}`
  );
};

/**
 * 특정 멤버 가져오기
 * @queryParam {string} memberUUID
 * @returns {MemberResponse} MemberResponse
 */
export const usePrivateMember = () => {
  return useDynamicFetch<MemberResponse, MemberUUIDParam>(
    ({ memberUUID }) => `/admin/members/${memberUUID}`
  );
};

/**
 * 멤버 정보 수정하기
 * @body {UpdateMember} UpdateMember
 * @queryParam {string} memberUUID
 * @returns {MemberResponse} MemberResponse
 */
export const usePrivateUpdateMember = () => {
  return useDynamicMutation<MemberResponse, MemberUUIDParam, UpdateMember>(
    HttpMethod.PATCH,
    ({ memberUUID }) => `/admin/members/${memberUUID}`
  );
};

/**
 * 멤버 프로필 이미지 수정하기
 * @queryParam {string} memberUUID
 * @body {FormData} FormData
 * @returns {UpdateMemberProfileImageResponse} UpdateMemberProfileImageResponse
 */
export const usePrivateUpdateMemberProfileImage = () => {
  return useDynamicMutation<
    UpdateMemberProfileImageResponse,
    MemberUUIDParam,
    FormData
  >(
    HttpMethod.PATCH,
    ({ memberUUID }) => `/admin/members/${memberUUID}/profile`,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

/**
 * 멤버 프로필 이미지 삭제하기
 * @queryParam {string} memberUUID
 * @returns {DeleteMemberProfileImageResponse} DeleteMemberProfileImageResponse
 */
export const usePrivateDeleteMemberProfileImage = () => {
  return useDynamicMutation<DeleteMemberProfileImageResponse, MemberUUIDParam>(
    HttpMethod.DELETE,
    ({ memberUUID }) => `/admin/members/${memberUUID}/profile`
  );
};

/**
 * 멤버 프로필에 링크 추가하기
 * @queryParam {string} memberUUID
 * @body {MemberLink} MemberLink
 * @returns {MemberResponse} MemberResponse
 */
export const usePrivateCreateMemberLink = () => {
  return useDynamicMutation<MemberResponse, MemberUUIDParam, MemberLink>(
    HttpMethod.POST,
    ({ memberUUID }) => `/admin/members/${memberUUID}/links`
  );
};

/**
 * 멤버 프로필에 링크 수정하기
 * @queryParam {string} memberUUID
 * @queryParam {string} linkUUID
 * @body {MemberLink} MemberLink
 * @returns {MemberResponse} MemberResponse
 */
export const usePrivateUpdateMemberLink = () => {
  return useDynamicMutation<
    MemberResponse,
    MemberUUIDWithLinkParam,
    MemberLink
  >(
    HttpMethod.PATCH,
    ({ memberUUID, linkUUID }) =>
      `/admin/members/${memberUUID}/links/${linkUUID}`
  );
};

/**
 * 멤버 프로필에 링크 삭제하기
 * @queryParam {string} memberUUID
 * @queryParam {string} linkUUID
 * @returns {MemberResponse} MemberResponse
 */
export const usePrivateDeleteMemberLink = () => {
  return useDynamicMutation<MemberResponse, MemberUUIDWithLinkParam>(
    HttpMethod.DELETE,
    ({ memberUUID, linkUUID }) =>
      `/admin/members/${memberUUID}/links/${linkUUID}`
  );
};

/**
 * 멤버 스킬 추가하기
 * @queryParam {string} memberUUID
 * @body {MemberSkillRequest} MemberSkillRequest
 * @returns {MemberSkill} MemberSkill
 */
export const usePrivateCreateMemberSkill = () => {
  return useDynamicMutation<
    MemberSkillResponse,
    MemberUUIDParam,
    MemberSkillRequest
  >(HttpMethod.POST, ({ memberUUID }) => `/admin/members/${memberUUID}/skills`);
};

/**
 * 멤버 스킬 수정하기
 * @queryParam {string} memberUUID
 * @queryParam {string} skillUUID
 * @body {UpdateMemberSkill} UpdateMemberSkill
 * @returns {MemberSkill} MemberSkill
 */
export const usePrivateUpdateMemberSkill = () => {
  return useDynamicMutation<
    MemberSkillResponse,
    MemberUUIDWithSkillParam,
    UpdateMemberSkill
  >(
    HttpMethod.PATCH,
    ({ memberUUID, skillUUID }) =>
      `/admin/members/${memberUUID}/skills/${skillUUID}`
  );
};

/**
 * 멤버 스킬 삭제하기
 * @queryParam {string} memberUUID
 * @queryParam {string} skillUUID
 * @returns {MemberResponse} MemberResponse
 */
export const usePrivateDeleteMemberSkill = () => {
  return useDynamicMutation<MemberResponse, MemberUUIDWithSkillParam>(
    HttpMethod.DELETE,
    ({ memberUUID, skillUUID }) =>
      `/admin/members/${memberUUID}/skills/${skillUUID}`
  );
};
