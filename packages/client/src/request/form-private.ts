import { useQueryClient } from '@tanstack/react-query';
import { HttpMethod } from '../constants/http-method';
import { FormPrivateQueryKeys } from '../constants/query-keys';
import { FormId } from '../constants/query-keys/form-private';
import { useMutation } from '../hooks/use-mutation';
import { useQuery } from '../hooks/use-query';
import {
  CreateForm,
  DeleteFormResponse,
  FormDetailListResponse,
  FormDetailResponse,
  FormListResponse,
  FormResponse,
  UpdateForm,
} from '../schemas/form';

export const useAdminFormList = () => {
  return useQuery<FormListResponse>(FormPrivateQueryKeys.FORM, {
    method: HttpMethod.GET,
    url:    '/admin/form',
  });
};

export const useAdminForm = (id: FormId) => {
  return useQuery<FormResponse>(FormPrivateQueryKeys.FORM, {
    method: HttpMethod.GET,
    url:    `/admin/form/${id}`,
  });
};

export const useAdminFormResponseList = (id: FormId) => {
  return useQuery<FormDetailListResponse>(FormPrivateQueryKeys.FORM_RESPONSE(id),
    {
      method: HttpMethod.GET,
      url:    `/admin/form/${id}/application`,
    });
};

export const useAdminFormApplication = (responseId: FormId) => {
  return useQuery<FormDetailResponse>(FormPrivateQueryKeys.FORM_RESPONSE_DETAIL(responseId),
    {
      method: HttpMethod.GET,
      url:    `/admin/form/application/${responseId}`,
    });
};

export const useAdminCreateForm = () => {
  const queryClient = useQueryClient();

  return useMutation<FormResponse, CreateForm>({
    method: HttpMethod.POST,
    url:    '/form/admin',
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FormPrivateQueryKeys.FORM });
    },
    onError: error => {
      console.error('Error creating form:', error);
    },
  });
};

export const useAdminActivateForm = (id: FormId) => {
  const queryClient = useQueryClient();

  return useMutation<FormResponse>({
    method: HttpMethod.POST,
    url:    `/admin/form/${id}/activate`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FormPrivateQueryKeys.FORM_DETAIL(id) });
    },
    onError: error => {
      console.error('Error activating form:', error);
    },
  });
};

export const useAdminDeactivateForm = (id: FormId) => {
  const queryClient = useQueryClient();

  return useMutation<FormResponse>({
    method: HttpMethod.POST,
    url:    `/admin/form/${id}/deactivate`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FormPrivateQueryKeys.FORM_DETAIL(id) });
    },
    onError: error => {
      console.error('Error deactivating form:', error);
    },
  });
};

export const useAdminUpdateForm = (id: FormId) => {
  const queryClient = useQueryClient();

  return useMutation<FormResponse, UpdateForm>({
    method: HttpMethod.PATCH,
    url:    `/admin/form/${id}`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FormPrivateQueryKeys.FORM_DETAIL(id) });
    },
    onError: error => {
      console.error('Error updating form:', error);
    },
  });
};

export const useAdminDeleteForm = (id: FormId) => {
  const queryClient = useQueryClient();

  return useMutation<DeleteFormResponse>({
    method: HttpMethod.DELETE,
    url:    `/admin/form/${id}`,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FormPrivateQueryKeys.FORM_DETAIL(id) });
    },
    onError: error => {
      console.error('Error deleting form:', error);
    },
  });
};
