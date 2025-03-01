import { HttpMethod } from '@/constants/http-method';
import useDynamicFetch from '@/hooks/use-dynamic-fetch';
import useDynamicMutation from '@/hooks/use-dynamic-mutation';
import { useFetch } from '@/hooks/use-fetch';
import {
  CreateFormApplicationRequest,
  FormAccessibilityResponse,
  FormApplicationFileResponse,
  FormResponse,
  UpdateFormApplicationRequest,
  UploadFormApplicationFileResponse,
} from '@/schemas/form';
import { FormApplicationResponse } from './../../schemas/form';

export type FormIDParam = { formId: number };

/**
 * 활성화 된 폼 찾기
 * @return {FormResponse} FormListResponse
 */
export const useForm = () => {
  return useFetch<FormResponse>('/form');
};

/**
 * 새 Form 응답 만들기
 * @queryParam {number} formId
 * @body {MutateFormApplication} MutateFormApplication
 * @return {FormResponse} FormResponse
 */
export const useCreateFormApplication = () => {
  return useDynamicMutation<
    FormResponse,
    FormIDParam,
    CreateFormApplicationRequest
  >(HttpMethod.POST, ({ formId }) => `/form/${formId}/application`);
};

/**
 * 내 Form 응답 가져오기
 * @queryParam {number} formId
 * @return {FormApplicationResponse} FormApplicationResponse
 */
export const useFormApplication = () => {
  return useDynamicFetch<FormApplicationResponse, FormIDParam>(
    ({ formId }) => `/form/${formId}/application`,
  );
};

/**
 * 내 Form 응답 수정하기
 * @queryParam {number} formId
 * @body {MutateFormApplication} MutateFormApplication
 * @return {FormApplicationResponse} FormApplicationResponse
 */
export const useUpdateFormApplication = () => {
  return useDynamicMutation<
    FormApplicationResponse,
    FormIDParam,
    UpdateFormApplicationRequest
  >(HttpMethod.PATCH, ({ formId }) => `/form/${formId}/application`);
};

/**
 * 내 Form 응답 삭제하기
 * @queryParam {number} formId
 * @return {FormApplicationResponse} FormApplicationResponse
 */
export const useDeleteFormApplication = () => {
  return useDynamicMutation<FormApplicationResponse, FormIDParam>(
    HttpMethod.DELETE,
    ({ formId }) => `/form/${formId}/application`,
  );
};

/**
 * 내 Form 응답에 파일 첨부하기
 * @queryParam {number} formId
 * @body {FormData} FormData
 * @return {FormResponse} FormResponse
 */
export const useUploadFormApplicationFile = () => {
  return useDynamicMutation<
    UploadFormApplicationFileResponse,
    FormIDParam,
    FormData
  >(HttpMethod.PATCH, ({ formId }) => `/form/${formId}/application/file`, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/**
 * 내 Form 응답에 있는 파일 가져오기
 * @queryParam {number} formId
 * @return {FilePresignedUrlResponse} FilePresignedUrlResponse
 */
export const useFormApplicationFile = () => {
  return useDynamicFetch<FormApplicationFileResponse, FormIDParam>(
    ({ formId }) => `/form/${formId}/application/file`,
  );
};

/**
 * 내 Form 응답에 있는 파일 삭제하기
 * @queryParam {number} formId
 * @return {FormResponse} FormResponse
 */
export const useDeleteFormApplicationFile = () => {
  return useDynamicMutation<FormApplicationResponse, FormIDParam>(
    HttpMethod.DELETE,
    ({ formId }) => `/form/${formId}/application/file`,
  );
};

/**
 * 내 Form 응답 제출하기
 * @queryParam {number} formId
 * @return {FormResponse} FormResponse
 */
export const useFormApplicationSubmit = () => {
  return useDynamicMutation<FormApplicationResponse, FormIDParam>(
    HttpMethod.POST,
    ({ formId }) => `/form/${formId}/application/apply`,
  );
};

/**
 * 해당 Form 접근 가능 여부
 * @queryParam {number} formId
 */
export const useFormAccessibility = () => {
  return useDynamicFetch<FormAccessibilityResponse, FormIDParam>(
    ({ formId }) => `/form/${formId}/application/accessibility`,
  );
};
