export type FormId = number;

export const FormPrivateQueryKeys = {
  FORM: 'form/private/form',
  FORM_DETAIL: (id: FormId) => [FormPrivateQueryKeys.FORM, id],
  FORM_RESPONSE: (id: FormId) => [FormPrivateQueryKeys.FORM, id, 'response'],
  FORM_RESPONSE_DETAIL: (responseId: FormId) => [
    FormPrivateQueryKeys.FORM,
    'response',
    responseId,
  ],
  FORM_ACTIVATE: (id: FormId) => [FormPrivateQueryKeys.FORM, id, 'activate'],
  FORM_DEACTIVATE: (id: FormId) => [
    FormPrivateQueryKeys.FORM,
    id,
    'deactivate',
  ],
};
