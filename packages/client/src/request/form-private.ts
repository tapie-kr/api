import { HttpMethod } from '@/constants/http-method';
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
import { FormId } from './form';

export const usePrivateFormList = () => {
  return useFetch<FormListResponse>('/admin/form');
};

export const usePrivateForm = (id: FormId) => {
  return useFetch<FormResponse>(`/admin/form/${id}`);
};

export const usePrivateFormResponseList = (id: FormId) => {
  return useFetch<FormDetailListResponse>(`/admin/form/${id}/application`);
};

export const usePrivateFormApplication = (responseId: FormId) => {
  return useFetch<FormDetailResponse>(`/admin/form/application/${responseId}`);
};

export const usePrivateCreateForm = () => {
  return useMutation<FormResponse, CreateForm>(HttpMethod.POST, '/admin/form');
};

export const usePrivateActivateForm = (id: FormId) => {
  return useMutation<FormResponse>(HttpMethod.POST, `/admin/form/${id}/activate`);
};

export const usePrivateDeactivateForm = (id: FormId) => {
  return useMutation<FormResponse>(HttpMethod.POST, `/admin/form/${id}/deactivate`);
};

export const usePrivateUpdateForm = (id: FormId) => {
  return useMutation<FormResponse, UpdateForm>(HttpMethod.PATCH, `/admin/form/${id}`);
};

export const usePrivateDeleteForm = (id: FormId) => {
  return useMutation<DeleteFormResponse>(HttpMethod.DELETE, `/admin/form/${id}`);
};
