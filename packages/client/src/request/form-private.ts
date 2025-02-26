import { HttpMethod } from "@/constants/http-method";
import { useFetch } from "@/hooks/use-fetch";
import useDynamicFetch from "@/hooks/use-dynamic-fetch";
import { useMutation } from "@/hooks/use-mutation";
import useDynamicMutation from "@/hooks/use-dynamic-mutation";
import {
  CreateFormRequest,
  DeleteFormResponseType,
  FormDetailListResponse,
  FormDetailResponse,
  FormListResponse,
  FormResponse,
} from "@/schemas/form";
import { FormUUIDParam } from "./form";

export const usePrivateFormList = () =>
  useFetch<FormListResponse>("/admin/form");

export const usePrivateForm = () =>
  useDynamicFetch<FormResponse, FormUUIDParam>(
    ({ formUUID: formId }) => `/admin/form/${formId}`
  );

export const usePrivateFormResponseList = () =>
  useDynamicFetch<FormDetailListResponse, FormUUIDParam>(
    ({ formUUID: formId }) => `/admin/form/${formId}/applications`
  );

export const usePrivateFormApplication = () =>
  useDynamicFetch<FormDetailResponse, FormUUIDParam>(
    ({ formUUID: formId }) => `/admin/form/applications/${formId}`
  );

export const usePrivateCreateForm = () =>
  useMutation<FormResponse, CreateFormRequest>(HttpMethod.POST, "/admin/form");

// Updated dynamic hooks (no parameter on hook call; mutate receives parameter)
export const usePrivateActivateForm = () => {
  return useDynamicMutation<FormResponse, FormUUIDParam>(
    ({ formUUID: formId }) => `/admin/form/${formId}/activate`,
    HttpMethod.POST
  );
};

export const usePrivateDeactivateForm = () => {
  return useDynamicMutation<FormResponse, FormUUIDParam>(
    ({ formUUID: formId }) => `/admin/form/${formId}/deactivate`,
    HttpMethod.POST
  );
};

export const usePrivateUpdateForm = () => {
  return useDynamicMutation<FormResponse, FormUUIDParam>(
    ({ formUUID: formId }) => `/admin/form/${formId}`,
    HttpMethod.PATCH
  );
};

export const usePrivateDeleteForm = () => {
  return useDynamicMutation<DeleteFormResponseType, FormUUIDParam>(
    ({ formUUID: formId }) => `/admin/form/${formId}`,
    HttpMethod.DELETE
  );
};
