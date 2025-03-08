import { useFetch } from "@/hooks/use-fetch"
import { MemberListResponse } from "@/schemas/member"

/**
 * 모든 멤버 가져오기 
 * @returns {MemberListResponse} MemberListResponse
 */
export const useMemberList = () => {
    return useFetch<MemberListResponse>('/members')
}