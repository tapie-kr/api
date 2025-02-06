import eslintConfig from '@tapie-kr/code-guideline-base';

const extendedConfig = [
  ...eslintConfig,
  { rules: { 'no-restricted-imports': [
    'error',
    { patterns: [
      { group: [
        '../*',
        '../../*',
        '../../../*',
      ] },
    ] },
  ] } },
];

export default extendedConfig;
