import { HttpMethod } from "@/constants/http-method";
import { useFetch } from "@/hooks/use-fetch";
import useDynamicMutation from "@/hooks/use-dynamic-mutation";
import {
  CreateFormApplicationRequest,
  FormApplicationFileResponse,
  FormListResponse,
  FormResponse,
  UpdateFormApplicationRequest,
} from "@/schemas/form";
import useDynamicFetch from "@/hooks/use-dynamic-fetch";

export type FormUUID = number;
export type FormUUIDParam = { formId: FormUUID };
export type FormApplicationParam = { applicationUUID: number };

// Read-only endpoints remain unchanged:
export const useFormListPublic = () => useFetch<FormListResponse>("/form");

export const useFormApplication = () =>
  useDynamicFetch<FormResponse, FormUUIDParam>(
    ({ formId }) => `/form/${formId}/application`
  );

export const useFormApplicationFile = () =>
  useDynamicFetch<FormApplicationFileResponse, FormUUIDParam>(
    ({ formId }) => `/form/${formId}/application/file`
  );

export const useFormAccessibility = () =>
  useDynamicFetch<FormResponse, FormUUIDParam>(
    ({ formId }) => `/form/${formId}/application/accessibility`
  );

export const useCreateFormApplication = () =>
  useDynamicMutation<FormResponse, FormUUIDParam, CreateFormApplicationRequest>(
    ({ formId }) => `/form/${formId}/application`,
    HttpMethod.POST
  );

export const useUpdateFormApplication = () =>
  useDynamicMutation<FormResponse, FormUUIDParam, UpdateFormApplicationRequest>(
    ({ formId }) => `/form/${formId}/application`,
    HttpMethod.PATCH
  );

export const useDeleteFormApplication = () =>
  useDynamicMutation<FormResponse, FormUUIDParam, unknown>(
    ({ formId }) => `/form/${formId}/application`,
    HttpMethod.DELETE
  );

export const useUploadFormApplicationFile = () =>
  useDynamicMutation<unknown, FormUUIDParam, unknown>(
    ({ formId }) => `/form/${formId}/application/file`,
    HttpMethod.PATCH
  );

export const useFormSubmit = () =>
  useDynamicMutation<FormResponse, FormUUIDParam, unknown>(
    ({ formId }) => `/form/${formId}/application/submit`,
    HttpMethod.POST
  );
