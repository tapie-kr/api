import { useQueryClient } from '@tanstack/react-query';
import { HttpMethod } from '../constants/http-method';
import { FormPrivateQueryKeys } from '../constants/query-keys';
import { FormId } from '../constants/query-keys/form-private';
import { useMutation } from '../hooks/use-mutation';
import { useQuery } from '../hooks/use-query';
import {
  CreateForm,
  DeleteFormResponse,
  FormListResponse,
  FormResponse,
  UpdateForm,
} from '../schemas/form';

export const useFormList = () => {
  return useQuery<FormListResponse>(FormPrivateQueryKeys.FORM, {
    method: HttpMethod.GET,
    url: '/admin/form',
  });
};

export const useForm = (id: FormId) => {
  return useQuery<FormResponse>(FormPrivateQueryKeys.FORM, {
    method: HttpMethod.GET,
    url: `/admin/form/${id}`,
  });
};

export const useFormResponseList = (id: FormId) => {
  return useQuery<unknown>(FormPrivateQueryKeys.FORM_RESPONSE(id), {
    method: HttpMethod.GET,
    url: `/admin/form/${id}/responses`,
  });
};

export const useFormResponse = (responseId: FormId) => {
  return useQuery<unknown>(
    FormPrivateQueryKeys.FORM_RESPONSE_DETAIL(responseId),
    {
      method: HttpMethod.GET,
      url: `/admin/form/responses/${responseId}`,
    },
  );
};

export const useCreateForm = () => {
  const queryClient = useQueryClient();

  return useMutation<FormResponse, CreateForm>(
    {
      method: HttpMethod.POST,
      url: '/admin/form',
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: FormPrivateQueryKeys.FORM });
      },
      onError: (error) => {
        console.error('Error creating form:', error);
      },
    },
  );
};

export const useActivateForm = (id: FormId) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown>(
    {
      method: HttpMethod.POST,
      url: `/admin/form/${id}/activate`,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FormPrivateQueryKeys.FORM_DETAIL(id),
        });
      },
      onError: (error) => {
        console.error('Error activating form:', error);
      },
    },
  );
};

export const useDeactivateForm = (id: FormId) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown>(
    {
      method: HttpMethod.POST,
      url: `/admin/form/${id}/deactivate`,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FormPrivateQueryKeys.FORM_DETAIL(id),
        });
      },
      onError: (error) => {
        console.error('Error deactivating form:', error);
      },
    },
  );
};

export const useUpdateForm = (id: FormId) => {
  const queryClient = useQueryClient();

  return useMutation<FormResponse, UpdateForm>(
    {
      method: HttpMethod.PATCH,
      url: `/admin/form/${id}`,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FormPrivateQueryKeys.FORM_DETAIL(id),
        });
      },
      onError: (error) => {
        console.error('Error updating form:', error);
      },
    },
  );
};

export const useDeleteForm = (id: FormId) => {
  const queryClient = useQueryClient();

  return useMutation<DeleteFormResponse, unknown>(
    {
      method: HttpMethod.DELETE,
      url: `/admin/form/${id}`,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FormPrivateQueryKeys.FORM_DETAIL(id),
        });
      },
      onError: (error) => {
        console.error('Error deleting form:', error);
      },
    },
  );
};
