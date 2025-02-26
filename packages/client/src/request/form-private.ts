import { HttpMethod } from '@/constants/http-method';
import useDynamicFetch from '@/hooks/use-dynamic-fetch';
import useDynamicMutation from '@/hooks/use-dynamic-mutation';
import { useFetch } from '@/hooks/use-fetch';
import { useMutation } from '@/hooks/use-mutation';
import {
  CreateFormRequest,
  DeleteFormApplicationResponse,
  DeleteFormResponse,
  FormApplicationResponse,
  FormDetailListResponse,
  FormListResponse,
  FormResponse,
} from '@/schemas/form';
import { FormApplicationParam, FormUUIDParam } from './form';

export const usePrivateFormList = () =>
  useFetch<FormListResponse>('/admin/form');

export const usePrivateForm = () =>
  useDynamicFetch<FormResponse, FormUUIDParam>(
    ({ formId }) => `/admin/form/${formId}`,
  );

export const usePrivateFormResponseList = () =>
  useDynamicFetch<FormDetailListResponse, FormUUIDParam>(
    ({ formId }) => `/admin/form/${formId}/applications`,
  );

export const usePrivateFormApplication = () =>
  useDynamicFetch<FormApplicationResponse, FormApplicationParam>(
    ({ applicationUUID }) => `/admin/form/applications/${applicationUUID}`,
  );

export const usePrivateDeleteFormApplication = () =>
  useDynamicMutation<DeleteFormApplicationResponse, FormApplicationParam>(
    ({ applicationUUID }) => `/admin/form/applications/${applicationUUID}`,
    HttpMethod.DELETE,
  );

export const usePrivateCreateForm = () =>
  useMutation<FormResponse, CreateFormRequest>(HttpMethod.POST, '/admin/form');

export const usePrivateActivateForm = () => {
  return useDynamicMutation<FormResponse, FormUUIDParam>(
    ({ formId }) => `/admin/form/${formId}/activate`,
    HttpMethod.POST,
  );
};

export const usePrivateDeactivateForm = () => {
  return useDynamicMutation<FormResponse, FormUUIDParam>(
    ({ formId }) => `/admin/form/${formId}/deactivate`,
    HttpMethod.POST,
  );
};

export const usePrivateUpdateForm = () => {
  return useDynamicMutation<FormResponse, FormUUIDParam>(
    ({ formId }) => `/admin/form/${formId}`,
    HttpMethod.PATCH,
  );
};

export const usePrivateDeleteForm = () => {
  return useDynamicMutation<DeleteFormResponse, FormUUIDParam>(
    ({ formId }) => `/admin/form/${formId}`,
    HttpMethod.DELETE,
  );
};
