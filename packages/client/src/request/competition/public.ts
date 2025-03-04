import useDynamicFetch from "@/hooks/use-dynamic-fetch";
import { PublicAwardListResponse } from "@/schemas/competition";

type YearFilterParam = { year?: string };

/**
 * 모든 대회 수상 가져오기 (메인 페이지용)
 * @returns {PublicAwardListResponse} PublicAwardListResponse
 */
export const useAwardList = () => {
  return useDynamicFetch<PublicAwardListResponse, YearFilterParam>(
    ({ year }) => `/portfolio/awards/main?year=${year}`
  );
};