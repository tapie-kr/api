export const ApplyFormPrivateQueryKeys = {
  FORM: 'applyFormPrivate/form',
  FORM_DETAIL: (id: string) => [ApplyFormPrivateQueryKeys.FORM, id],
  FORM_RESPONSE: (id: string) => [
    ApplyFormPrivateQueryKeys.FORM,
    id,
    'response',
  ],
  FORM_RESPONSE_DETAIL: (responseId: string) => [
    ApplyFormPrivateQueryKeys.FORM,
    'response',
    responseId,
  ],
  FORM_ACTIVATE: (id: string) => [
    ApplyFormPrivateQueryKeys.FORM,
    id,
    'activate',
  ],
  FORM_DEACTIVATE: (id: string) => [
    ApplyFormPrivateQueryKeys.FORM,
    id,
    'deactivate',
  ],
};
