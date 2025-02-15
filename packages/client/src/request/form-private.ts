import { useQueryClient } from '@tanstack/react-query';
import { HttpMethod } from '../constants/http-method';
import { FormPrivateQueryKeys } from '../constants/query-keys';
import { FormId } from '../constants/query-keys/form-private';
import { useMutation } from '../hooks/use-mutation';
import { useQuery } from '../hooks/use-query';
import {
  CreateForm,
  CreateFormResponse,
  DeleteFormResponse,
  FormListResponse,
  FormResponse,
  UpdateForm,
  UpdateFormResponse,
} from '../schemas/form';

export const useFormList = () => {
  return useQuery<FormListResponse>(FormPrivateQueryKeys.FORM, {
    method: HttpMethod.GET,
    url: '/form/admin',
  });
};

export const useForm = (id: FormId) => {
  return useQuery<FormResponse>(FormPrivateQueryKeys.FORM, {
    method: HttpMethod.GET,
    url: `/form/admin/${id}`,
  });
};

export const useCreateForm = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateFormResponse, CreateForm>(
    {
      method: HttpMethod.POST,
      url: '/form/admin',
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

export const useUpdateForm = (id: FormId) => {
  const queryClient = useQueryClient();

  return useMutation<UpdateFormResponse, UpdateForm>(
    {
      method: HttpMethod.PATCH,
      url: `/form/admin/${id}`,
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
      url: `/form/admin/${id}`,
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
