import eslintConfig from '@tapie-kr/code-guideline-base';

const overridesConfig = [...eslintConfig, { rules: { '@typescript-eslint/consistent-type-imports': 'off' } }];

export default overridesConfig;
