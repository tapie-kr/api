import { useFetch } from "@/hooks/use-fetch"
import { PortfolioListResponse } from "@/schemas/portfolio"

/**
 * 포트폴리오 리스트 가져오기
 * @returns {PortfolioListResponse} PortfolioListResponse
 */
export const usePortfolioList = () => {
    return useFetch<PortfolioListResponse>('/projects')
}