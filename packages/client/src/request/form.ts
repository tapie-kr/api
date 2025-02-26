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
export type FormUUIDParam = { formUUID: FormUUID };
export type FormApplicationParam = { applicationUUID: number };

// Read-only endpoints remain unchanged:
export const useFormListPublic = () => useFetch<FormListResponse>("/form");

export const useFormApplication = () =>
  useDynamicFetch<FormResponse, FormUUIDParam>(
    ({ formUUID }) => `/form/${formUUID}/application`
  );

export const useFormApplicationFile = () =>
  useDynamicFetch<FormApplicationFileResponse, FormUUIDParam>(
    ({ formUUID }) => `/form/${formUUID}/application/file`
  );

export const useFormAccessibility = () =>
  useDynamicFetch<FormResponse, FormUUIDParam>(
    ({ formUUID }) => `/form/${formUUID}/application/accessibility`
  );

export const useCreateFormApplication = () =>
  useDynamicMutation<FormResponse, FormUUIDParam, CreateFormApplicationRequest>(
    ({ formUUID }) => `/form/${formUUID}/application`,
    HttpMethod.POST
  );

export const useUpdateFormApplication = () =>
  useDynamicMutation<FormResponse, FormUUIDParam, UpdateFormApplicationRequest>(
    ({ formUUID }) => `/form/${formUUID}/application`,
    HttpMethod.PATCH
  );

export const useDeleteFormApplication = () =>
  useDynamicMutation<FormResponse, FormUUIDParam, unknown>(
    ({ formUUID }) => `/form/${formUUID}/application`,
    HttpMethod.DELETE
  );

export const useUploadFormApplicationFile = () =>
  useDynamicMutation<unknown, FormUUIDParam, unknown>(
    ({ formUUID }) => `/form/${formUUID}/application/file`,
    HttpMethod.PATCH
  );

export const useFormSubmit = () =>
  useDynamicMutation<FormResponse, FormUUIDParam, unknown>(
    ({ formUUID }) => `/form/${formUUID}/application/submit`,
    HttpMethod.POST
  );
