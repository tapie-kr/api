import { HttpMethod } from '@/constants/http-method';
import { FormId } from '@/constants/query-keys/form-private';
import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';
import {
  CreateForm,
  DeleteFormResponse,
  FormDetailListResponse,
  FormDetailResponse,
  FormListResponse,
  FormResponse,
  UpdateForm,
} from '@/schemas/form';

export const useAdminFormList = () => {
  return useFetch<FormListResponse>('/admin/form');
};

export const useAdminForm = (id: FormId) => {
  return useFetch<FormResponse>(`/admin/form/${id}`);
};

export const useAdminFormResponseList = (id: FormId) => {
  return useFetch<FormDetailListResponse>(`/admin/form/${id}/application`);
};

export const useAdminFormApplication = (responseId: FormId) => {
  return useFetch<FormDetailResponse>(`/admin/form/application/${responseId}`);
};

export const useAdminCreateForm = () => {
  return useMutation<FormResponse, CreateForm>(HttpMethod.POST, '/form/admin');
};

export const useAdminActivateForm = (id: FormId) => {
  return useMutation<FormResponse>(HttpMethod.POST, `/admin/form/${id}/activate`);
};

export const useAdminDeactivateForm = (id: FormId) => {
  return useMutation<FormResponse>(HttpMethod.POST, `/admin/form/${id}/deactivate`);
};

export const useAdminUpdateForm = (id: FormId) => {
  return useMutation<FormResponse, UpdateForm>(HttpMethod.PATCH, `/admin/form/${id}`);
};

export const useAdminDeleteForm = (id: FormId) => {
  return useMutation<DeleteFormResponse>(HttpMethod.DELETE, `/admin/form/${id}`);
};
