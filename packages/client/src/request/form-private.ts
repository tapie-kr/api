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
import { FormApplicationParam, FormUUIDParam } from "./form";

export const usePrivateFormList = () =>
  useFetch<FormListResponse>("/admin/form");

export const usePrivateForm = () =>
  useDynamicFetch<FormResponse, FormUUIDParam>(
    ({ formUUID }) => `/admin/form/${formUUID}`
  );

export const usePrivateFormResponseList = () =>
  useDynamicFetch<FormDetailListResponse, FormUUIDParam>(
    ({ formUUID }) => `/admin/form/${formUUID}/applications`
  );

export const usePrivateFormApplication = () =>
  useDynamicFetch<FormDetailResponse, FormApplicationParam>(
    ({ applicationUUID }) => `/admin/form/applications/${applicationUUID}`
  );

export const usePrivateCreateForm = () =>
  useMutation<FormResponse, CreateFormRequest>(HttpMethod.POST, "/admin/form");

// Updated dynamic hooks (no parameter on hook call; mutate receives parameter)
export const usePrivateActivateForm = () => {
  return useDynamicMutation<FormResponse, FormUUIDParam>(
    ({ formUUID }) => `/admin/form/${formUUID}/activate`,
    HttpMethod.POST
  );
};

export const usePrivateDeactivateForm = () => {
  return useDynamicMutation<FormResponse, FormUUIDParam>(
    ({ formUUID }) => `/admin/form/${formUUID}/deactivate`,
    HttpMethod.POST
  );
};

export const usePrivateUpdateForm = () => {
  return useDynamicMutation<FormResponse, FormUUIDParam>(
    ({ formUUID }) => `/admin/form/${formUUID}`,
    HttpMethod.PATCH
  );
};

export const usePrivateDeleteForm = () => {
  return useDynamicMutation<DeleteFormResponseType, FormUUIDParam>(
    ({ formUUID }) => `/admin/form/${formUUID}`,
    HttpMethod.DELETE
  );
};
