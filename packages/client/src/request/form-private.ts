import { useQueryClient } from '@tanstack/react-query';
import { HttpMethod } from '../constants/http-method';
import { FormPrivateQueryKeys } from '../constants/query-keys';
import { FormId } from '../constants/query-keys/form-private';
import { useMutation } from '../hooks/use-mutation';
import { CreateForm, CreateFormResponse } from '../schemas/form';

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

  return useMutation<CreateForm, CreateForm>(
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
