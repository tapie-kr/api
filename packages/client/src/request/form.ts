import { useQueryClient } from '@tanstack/react-query';
import { HttpMethod } from '../constants/http-method';
import { useQuery } from '../hooks/use-query';
import {
  CreateForm,
  CreateFormApplication,
  FormApplicationFile,
  FormDetailResponse,
  FormListResponse,
  FormResponse,
  UpdateFormApplication,
} from '../schemas/form';
import { useMutation } from '../hooks/use-mutation';
import { FormQueryKeys } from '../constants/query-keys/form';

export const useFormListPublic = () => {
  return useQuery<FormListResponse>(FormQueryKeys.FORM, {
    method: HttpMethod.GET,
    url: '/form',
  });
};

export const useCreateFormApplication = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<FormResponse, CreateFormApplication>(
    {
      method: HttpMethod.POST,
      url: `/form/${id}/application`,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: FormQueryKeys.FORM });
      },
    }
  );
};

export const useFormApplication = (id: string) => {
  useQuery<FormResponse>(FormQueryKeys.FORM_APPLICATION(id), {
    method: HttpMethod.GET,
    url: `/form/${id}/application`,
  });
};

export const useUpdateFormApplication = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<FormResponse, UpdateFormApplication>(
    {
      method: HttpMethod.PATCH,
      url: `/form/${id}/application`,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FormQueryKeys.FORM_APPLICATION(id),
        });
      },
      onError: (error) => {
        console.error('Error updating form application:', error);
      },
    }
  );
};

export const useDeleteFormApplication = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<FormResponse>(
    {
      method: HttpMethod.DELETE,
      url: `/form/${id}/application`,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FormQueryKeys.FORM_APPLICATION(id),
        });
      },
      onError: (error) => {
        console.error('Error deleting form application:', error);
      },
    }
  );
};

export const useUploadFormApplicationFile = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, unknown>(
    {
      method: HttpMethod.PATCH,
      url: `/form/${id}/application/file`,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FormQueryKeys.FORM_APPLICATION_FILE(id),
        });
      },
      onError: (error) => {
        console.error('Error uploading form application file:', error);
      },
    }
  );
};

export const useFormApplicationFile = (id: string) => {
  useQuery<FormApplicationFile>(FormQueryKeys.FORM_APPLICATION_FILE(id), {
    method: HttpMethod.GET,
    url: `/form/${id}/application/file`,
  });
};

export const useDeleteFormApplicationFile = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<FormDetailResponse, unknown>(
    {
      method: HttpMethod.DELETE,
      url: `/form/${id}/application/file`,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FormQueryKeys.FORM_APPLICATION_FILE(id),
        });
      },
      onError: (error) => {
        console.error('Error deleting form application file:', error);
      },
    }
  );
};

export const useFormSubmit = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<FormResponse, unknown>(
    {
      method: HttpMethod.POST,
      url: `/form/${id}/application/apply`,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: FormQueryKeys.FORM });
      },
      onError: (error) => {
        console.error('Error submitting form:', error);
      },
    }
  );
};

export const useFormAccessibility = (id: string) => {
  useQuery(FormQueryKeys.FORM_APPLICATION_ACCESSIBILITY(id), {
    method: HttpMethod.GET,
    url: `/form/${id}/application/accessibility`,
  });
};
