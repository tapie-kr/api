import { HttpMethod } from '@/constants/http-method';
import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';
import {
  CreateFormApplication,
  FormApplicationFile,
  FormApplicationResponse,
  FormListResponse,
  FormResponse,
  UpdateFormApplication,
} from '@/schemas/form';

export type FormId = number;

export const useFormListPublic = () => {
  return useFetch<FormListResponse>('/form');
};

export const useCreateFormApplication = (id: FormId) => {
  return useMutation<FormResponse, CreateFormApplication>(
    HttpMethod.POST,
    `/form/${id}/application`,
  );
};

export const useFormApplication = (id: FormId) => {
  return useFetch<FormResponse>(`/form/${id}/application`);
};

export const useUpdateFormApplication = (id: FormId) => {
  return useMutation<FormResponse, UpdateFormApplication>(
    HttpMethod.PATCH,
    `/form/${id}/application`,
  );
};

export const useDeleteFormApplication = (id: FormId) => {
  return useMutation<FormResponse>(
    HttpMethod.DELETE,
    `/form/${id}/application`,
  );
};

export const useUploadFormApplicationFile = (id: FormId) => {
  return useMutation<unknown, unknown>(
    HttpMethod.PATCH,
    `/form/${id}/application/file`,
  );
};

export const useFormApplicationFile = (id: FormId) => {
  return useFetch<FormApplicationFile>(`/form/${id}/application/file`);
};

export const useDeleteFormApplicationFile = (id: FormId) => {
  return useMutation<FormApplicationResponse, unknown>(
    HttpMethod.DELETE,
    `/form/${id}/application/file`,
  );
};

export const useFormSubmit = (id: FormId) => {
  return useMutation<FormResponse, unknown>(
    HttpMethod.POST,
    `/form/${id}/application/submit`,
  );
};

export const useFormAccessibility = (id: FormId) => {
  return useFetch<FormResponse>(`/form/${id}/application/accessibility`);
};
