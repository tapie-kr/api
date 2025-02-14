export const FormPrivateQueryKeys = {
  FORM: 'form/private/form',
  FORM_DETAIL: (id: string) => [FormPrivateQueryKeys.FORM, id],
  FORM_RESPONSE: (id: string) => [FormPrivateQueryKeys.FORM, id, 'response'],
  FORM_RESPONSE_DETAIL: (responseId: string) => [
    FormPrivateQueryKeys.FORM,
    'response',
    responseId,
  ],
  FORM_ACTIVATE: (id: string) => [FormPrivateQueryKeys.FORM, id, 'activate'],
  FORM_DEACTIVATE: (id: string) => [
    FormPrivateQueryKeys.FORM,
    id,
    'deactivate',
  ],
};
