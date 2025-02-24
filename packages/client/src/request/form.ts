import { HttpMethod } from '@/constants/http-method';
import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';
import {
  CreateFormApplication,
  FormApplicationFile,
  FormDetailResponse,
  FormListResponse,
  FormResponse,
  UpdateFormApplication,
} from '@/schemas/form';

export const useFormListPublic = () => {
  return useFetch<FormListResponse>('/form');
};

export const useCreateFormApplication = (id: string) => {
  return useMutation<FormResponse, CreateFormApplication>(HttpMethod.POST, `/form/${id}/application`);
};

export const useFormApplication = (id: string) => {
  return useFetch<FormResponse>(`/form/${id}/application`);
};

export const useUpdateFormApplication = (id: string) => {
  return useMutation<FormResponse, UpdateFormApplication>(HttpMethod.PATCH, `/form/${id}/application`);
};

export const useDeleteFormApplication = (id: string) => {
  return useMutation<FormResponse>(HttpMethod.DELETE, `/form/${id}/application`);
};

export const useUploadFormApplicationFile = (id: string) => {
  return useMutation<unknown, unknown>(HttpMethod.PATCH, `/form/${id}/application/file`);
};

export const useFormApplicationFile = (id: string) => {
  return useFetch<FormApplicationFile>(`/form/${id}/application/file`);
};

export const useDeleteFormApplicationFile = (id: string) => {
  return useMutation<FormDetailResponse, unknown>(HttpMethod.DELETE, `/form/${id}/application/file`);
};

export const useFormSubmit = (id: string) => {
  return useMutation<FormResponse, unknown>(HttpMethod.POST, `/form/${id}/application/submit`);
};

export const useFormAccessibility = (id: string) => {
  return useFetch<FormResponse>(`/form/${id}/application/accessibility`);
};
