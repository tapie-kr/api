export type FormId = number;

const FormPrivateQueryKey = 'form/private/form';

export const FormPrivateQueryKeys = {
  FORM:          [FormPrivateQueryKey],
  FORM_DETAIL:   (id: FormId) => [FormPrivateQueryKey, id],
  FORM_RESPONSE: (id: FormId) => [
    FormPrivateQueryKey,
    id,
    'response',
  ],
  FORM_RESPONSE_DETAIL: (responseId: FormId) => [
    FormPrivateQueryKey,
    'response',
    responseId,
  ],
  FORM_ACTIVATE: (id: FormId) => [
    FormPrivateQueryKey,
    id,
    'activate',
  ],
  FORM_DEACTIVATE: (id: FormId) => [
    FormPrivateQueryKey,
    id,
    'deactivate',
  ],
};
