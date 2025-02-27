import { HttpMethod } from '@/constants/http-method';
import useDynamicFetch from '@/hooks/use-dynamic-fetch';
import useDynamicMutation from '@/hooks/use-dynamic-mutation';
import { useFetch } from '@/hooks/use-fetch';
import { FilePresignedUrlResponse } from '@/schemas/file'
import {
  FormApplicationResponse,
  FormListResponse,
  MutateFormApplication,
} from '@/schemas/form';

export type FormIDParam = { formId: number };

/**
 * 활성화 된 폼 찾기
 * @return {FormListResponse} FormListResponse
 */
export const useFormList = () => {
  return useFetch<FormListResponse>('/form');
};

/**
 * 새 Form 응답 만들기
 * @queryParam {number} formId
 * @body {MutateFormApplication} MutateFormApplication
 * @return {FormResponse} FormResponse
 */
export const useCreateFormApplication = () => {
  useDynamicMutation<
    FormApplicationResponse,
    FormIDParam,
    MutateFormApplication
  >(HttpMethod.POST, ({ formId }) => `/form/${formId}/application`);
};

/**
 * 내 Form 응답 가져오기
 * @queryParam {number} formId
 * @return {FormResponse} FormResponse
 */
export const useFormApplication = () => {
  useDynamicFetch<FormApplicationResponse, FormIDParam>(
    ({ formId }) => `/form/${formId}/application`
  );
};

/**
 * 내 Form 응답 수정하기
 * @queryParam {number} formId
 * @body {MutateFormApplication} MutateFormApplication
 * @return {FormResponse} FormResponse
 */
export const useUpdateFormApplication = () => {
  useDynamicMutation<
    FormApplicationResponse,
    FormIDParam,
    MutateFormApplication
  >(HttpMethod.PATCH, ({ formId }) => `/form/${formId}/application`);
};

/**
 * 내 Form 응답 삭제하기
 * @queryParam {number} formId
 * @return {FormResponse} FormResponse
 */
export const useDeleteFormApplication = () => {
  useDynamicMutation<FormApplicationResponse, FormIDParam, unknown>(
    HttpMethod.DELETE,
    ({ formId }) => `/form/${formId}/application`
  );
};

/**
 * 내 Form 응답에 파일 첨부하기
 * @queryParam {number} formId
 * @body {FormData} FormData
 * @return {FormResponse} FormResponse
 */
export const useUploadFormApplicationFile = () => {
  useDynamicMutation<unknown, FormIDParam, FormData>(
    HttpMethod.PATCH,
    ({ formId }) => `/form/${formId}/application/file`,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
};

/**
 * 내 Form 응답에 있는 파일 가져오기
 * @queryParam {number} formId
 * @return {FilePresignedUrlResponse} FilePresignedUrlResponse
 */
export const useFormApplicationFile = () => {
    useDynamicFetch<FilePresignedUrlResponse, FormIDParam>(
        ({ formId }) => `/form/${formId}/application/file`
    );
}

/**
 * 내 Form 응답에 있는 파일 삭제하기
 * @queryParam {number} formId
 * @return {FormResponse} FormResponse
 */
export const useDeleteFormApplicationFile = () => {
    useDynamicMutation<FormApplicationResponse, FormIDParam, unknown>(
        HttpMethod.DELETE,
        ({ formId }) => `/form/${formId}/application/file`
    );
}

/**
 * 내 Form 응답 제출하기
 * @queryParam {number} formId
 * @return {FormResponse} FormResponse
 */
export const useFormApplicationSubmit = () => {
    useDynamicMutation<FormApplicationResponse, FormIDParam, unknown>(
        HttpMethod.POST,
        ({ formId }) => `/form/${formId}/application/apply`
    );
}

/**
 * 해당 Form 접근 가능 여부
 * @queryParam {number} formId
 */
export const useFormAccessibility = () => {
    useDynamicFetch<boolean, FormIDParam>(
        ({ formId }) => `/form/${formId}/application/accessibility`
    );
}