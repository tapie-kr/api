import { HttpMethod } from "@/constants/http-method"
import useDynamicMutation from "@/hooks/use-dynamic-mutation"
import { useFetch } from "@/hooks/use-fetch"
import { useMutation } from "@/hooks/use-mutation"
import { CreateFormRequest, DeleteFormApplicationResponse, FormApplicationFileResponse, FormApplicationListResponse, FormApplicationResponse, FormListResponse, FormResponse, UpdateFormApplicationRequest, UpdateFormRequest } from "@/schemas/form"
import { FormIDParam } from "./public"
import useDynamicFetch from "@/hooks/use-dynamic-fetch"

type FormApplicationUUIDParam = { applicationUUID: string }

/**
 * 지원 폼 생성
 * @description 지원 폼을 생성합니다 (응답 생성 X)
 * @body {UpdateFormApplicationRequest} UpdateFormApplicationRequest
 * @returns {FormResponse} FormResponse
 */
export const usePrivateCreateForm = () => {
    return useMutation<FormResponse, CreateFormRequest>(
        HttpMethod.POST,
        "/admin/form"
    )
}

/**
 * 지원 폼 모두 가져오기
 * @returns {FormListResponse} FormListResponse
 */
export const usePrivateFormList = () => {
    return useFetch<FormListResponse>("/admin/form")
}

/**
 * 특정 지원 폼 수정
 * @queryParam {string} formId
 * @body {UpdateFormApplicationRequest} UpdateFormApplicationRequest
 * @returns {FormResponse} FormResponse
 */
export const usePrivateUpdateForm = () => {
    return useDynamicMutation<FormResponse, FormIDParam, UpdateFormRequest>(
        HttpMethod.PATCH,
        ({ formId }) => `/admin/form/${formId}`
    )
}

/**
 * 지원 폼 삭제
 * @queryParam {string} formId
 * @returns {FormResponse} FormResponse
 */
export const usePrivateDeleteForm = () => {
    return useDynamicMutation<FormResponse, FormIDParam>(
        HttpMethod.DELETE,
        ({ formId }) => `/admin/form/${formId}`,
    )
}

/**
 * 지원폼 가져오기
 * @queryParam {string} formId
 * @returns {FormResponse} FormResponse
 */
export const usePrivateForm = () => {
    return useDynamicFetch<FormResponse, FormIDParam>(
        ({ formId }) => `/admin/form/${formId}`
    )
}

/**
 * 특정 지원 폼의 모든 응답 가져오기
 * @queryParam {string} formId
 * @returns {FormListResponse} FormListResponse
 */
export const usePrivateFormApplicationList = () => {
    return useDynamicFetch<FormApplicationListResponse, FormIDParam>(
        ({ formId }) => `/admin/form/${formId}/applications`
    )
}

/**
 * 특정 지원 폼의 특정 응답 가져오기
 * @queryParam {string} applicationUUID
 * @returns {FormResponse} FormResponse
 */
export const usePrivateFormApplication = () => {
    return useDynamicFetch<FormApplicationResponse, FormApplicationUUIDParam>(
        ({ applicationUUID }) => `/admin/form/applications/${applicationUUID}`
    )
}

/**
 * 특정 지원 폼의 특정 응답 삭제
 * @queryParam {string} applicationUUID
 * @returns {FormResponse} FormResponse
 */
export const usePrivateDeleteFormApplication = () => {
    return useDynamicMutation<DeleteFormApplicationResponse, FormApplicationUUIDParam>(
        HttpMethod.DELETE,
        ({ applicationUUID }) => `/admin/form/applications/${applicationUUID}`
    )
}

export const usePrivateDownloadApplicationPortfolio = () => {
    return useDynamicFetch<FormApplicationFileResponse, FormApplicationUUIDParam>(
        ({ applicationUUID }) => `/admin/form/applications/${applicationUUID}/attachment`
    )
}

// TODO: NOT YET IMPLEMENTED
/**
 * 특정 지원폼의 특정 응답 합격 처리
 * @queryParam {string} applicationUUID
 * @description 2024-02-27 기준 구현되지 않은 API입니다.
 * @returns {FormResponse} FormResponse
 */
export const usePrivateApproveFormApplication = () => {
    return useDynamicMutation<FormApplicationResponse, FormApplicationUUIDParam>(
        HttpMethod.POST,
        ({ applicationUUID }) => `/admin/form/applications/${applicationUUID}/approve`
    )
}

/**
 * 지원 폼 활성화
 * @queryParam {string} formId
 * @returns {FormResponse} FormResponse
 */
export const usePrivateActivateForm = () => {
    return useDynamicMutation<FormResponse, FormIDParam>(
        HttpMethod.POST,
        ({ formId }) => `/admin/form/${formId}/activate`
    )
}

/**
 * 지원 폼 비활성화
 * @queryParam {string} formId
 * @returns {FormResponse} FormResponse
 */
export const usePrivateDeactivateForm = () => {
    return useDynamicMutation<FormResponse, FormIDParam>(
        HttpMethod.POST,
        ({ formId }) => `/admin/form/${formId}/deactivate`
    )
}