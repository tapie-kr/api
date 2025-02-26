import { HttpMethod } from '@/constants/http-method';
import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';
import {
  CreateForm,
  DeleteFormResponse,
  FormApplicationListResponse,
  FormApplicationResponse,
  FormListResponse,
  FormResponse,
  UpdateForm,
} from '@/schemas/form';
import { FormId } from './form';

export const usePrivateFormList = () => {
  return useFetch<FormListResponse>('/admin/form');
};

export const usePrivateForm = (id: FormId) => {
  return useFetch<FormResponse>(`/admin/form/${id}`);
};

export const usePrivateFormResponseList = (id: FormId) => {
  return useFetch<FormApplicationListResponse>(
    `/admin/form/${id}/applications`,
  );
};

export const usePrivateFormApplication = (responseId: FormId) => {
  return useFetch<FormApplicationResponse>(
    `/admin/form/applications/${responseId}`,
  );
};

export const usePrivateDeleteFormApplication = (responseId: FormId) => {};

export const usePrivateCreateForm = () => {
  return useMutation<FormResponse, CreateForm>(HttpMethod.POST, '/admin/form');
};

export const usePrivateActivateForm = (id: FormId) => {
  return useMutation<FormResponse>(
    HttpMethod.POST,
    `/admin/form/${id}/activate`,
  );
};

export const usePrivateDeactivateForm = (id: FormId) => {
  return useMutation<FormResponse>(
    HttpMethod.POST,
    `/admin/form/${id}/deactivate`,
  );
};

export const usePrivateUpdateForm = (id: FormId) => {
  return useMutation<FormResponse, UpdateForm>(
    HttpMethod.PATCH,
    `/admin/form/${id}`,
  );
};

export const usePrivateDeleteForm = (id: FormId) => {
  return useMutation<DeleteFormResponse>(
    HttpMethod.DELETE,
    `/admin/form/${id}`,
  );
};
