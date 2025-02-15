import { useQueryClient } from '@tanstack/react-query';
import { HttpMethod } from '../constants/http-method';
import { FormPrivateQueryKeys } from '../constants/query-keys';
import { useMutation } from '../hooks/use-mutation';
import { CreateForm, CreateFormResponse } from '../schemas/form';

export const useCreateApplyForm = () => {
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
        console.error('Error creating applyForm:', error);
      },
    },
  );
};

export const useUpdateApplyForm = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateForm, CreateForm>(
    {
      method: HttpMethod.PATCH,
      url: '/form/admin',
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: FormPrivateQueryKeys.FORM });
      },
      onError: (error) => {
        console.error('Error updating applyForm:', error);
      },
    },
  );
};
