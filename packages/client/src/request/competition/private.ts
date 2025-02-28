import { HttpMethod } from "@/constants/http-method";
import useDynamicFetch from "@/hooks/use-dynamic-fetch"
import useDynamicMutation from "@/hooks/use-dynamic-mutation";
import { useFetch } from "@/hooks/use-fetch";
import { useMutation } from "@/hooks/use-mutation";
import { AddAwardMemberRequest, AwardListResponse, CompetitionListResponse, CreateAwardRequest, CreateAwardResponse } from "@/schemas/competition";

type CompetitionUUIDParam = { competitionUUID: string };
type AwardUUIDParam = { awardUUID: string };
type AwardUUIDWithMemberUUIDParam = {
  awardUUID: string;
  memberUUID: string;
};

/**
 * 모든 대회 수상 실적 가져오기
 * @returns {AwardListResponse} AwardListResponse
 */
export const usePrivateAwardList = () => {
  return useFetch<AwardListResponse>("/admin/portfolio/awards");
};

/**
 * 수상 실적 추가하기
 * @description competition field는
 * 기존 competition을 연결하려면 uuid,
 * 새로운 competition을 만들려면 name을 입력하세요.
 * membersUUID field는 수상 멤버의 uuid를 입력하면 됩니다.
 * @body {CreateAward} CreateAwardRequest
 * @returns {CreateAwardResponse} CreateAwardResponse
 */
export const usePrivateCreateAward = () => {
  return useMutation<CreateAwardResponse, CreateAwardRequest>(
    HttpMethod.PATCH,
    "/admin/portfolio/awards"
  );
};

/**
 * 수상 실적 삭제하기
 * @queryParam {string} awardUUID
 */
export const usePrivateDeleteAward = () => {
  return useDynamicMutation<unknown, AwardUUIDParam, unknown>(
    HttpMethod.DELETE,
    ({ awardUUID }) => `/admin/portfolio/awards/${awardUUID}`
  );
};

/**
 * 수상 실적 멤버 추가
 * @queryParam {string} awardUUID
 * @body {AddAwardMember} AddAwardMember
 */
export const usePrivateAddAwardMember = () => {
  return useDynamicMutation<unknown, AwardUUIDParam, AddAwardMemberRequest>(
    HttpMethod.POST,
    ({ awardUUID }) => `/admin/portfolio/awards/${awardUUID}/members`
  );
};

/**
 * 수상 실적 멤버 삭제
 * @queryParam {string} awardUUID
 * @queryParam {string} memberUUID
 */
export const usePrivateDeleteAwardMember = () => {
  return useDynamicMutation<unknown, AwardUUIDWithMemberUUIDParam, unknown>(
    HttpMethod.DELETE,
    ({ awardUUID, memberUUID }) =>
      `/admin/portfolio/awards/${awardUUID}/members/${memberUUID}`
  );
};

/**
 * 모든 대회 가져오기
 * @returns {CompetitionListResponse} CompetitionListResponse
 */
export const usePrivateCompetitionList = () => {
    return useFetch<CompetitionListResponse>("/admin/portfolio/competitions");
}

/**
 * 대회 UUID로 수상 실적 가져오기
 * @param {string} competitionUUID
 * @returns {AwardListResponse} AwardListResponse
 */
export const usePrivateCompetitionAwardList = () => {
    return useDynamicFetch<AwardListResponse, CompetitionUUIDParam>(
        ({ competitionUUID }) => `/admin/portfolio/competitions/${competitionUUID}/awards`
    )
}

/**
 * 대회 삭제하기
 * @param {string} competitionUUID
 */
export const usePrivateDeleteCompetition = () => {
    return useDynamicMutation<unknown, CompetitionUUIDParam, unknown>(
        HttpMethod.DELETE,
        ({ competitionUUID }) => `/admin/portfolio/competitions/${competitionUUID}`
    )
}