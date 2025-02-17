const FormPublicQueryKey = 'form/public';

export const FormQueryKeys = {
    FORM: [FormPublicQueryKey],
    FORM_APPLICATION: (id: string) => [FormPublicQueryKey, id, 'application'],
    FORM_APPLICATION_FILE: (id: string) => [FormPublicQueryKey, id, 'application', 'file'],
    FORM_APPLICATION_ACCESSIBILITY: (id: string) => [FormPublicQueryKey, id, 'application', 'accessibility'],
}