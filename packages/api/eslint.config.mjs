import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  js.configs.recommended,
  prettierConfig,
  {
    // Default configuration for TypeScript
    files: ['**/*.{ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
          disallowTypeAnnotations: true,
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
      ],

      'comma-dangle': ['error', 'always-multiline'],

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-duplicate-imports': 'error',
      'no-undef': 'off',
      'no-redeclare': 'off',

      'unused-imports/no-unused-imports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^.+\\.css$'],
            ['^@cottons-kr/react-foundation', '^@/components/(?!.*?/shared$)'],
            ['^@?\\w', '^@/', '^\\.'],
            ['^\\u0000'],
          ],
        },
      ],

      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'directive', next: 'import' },
      ],
    },
  },
  {
    // JavaScript Configuration
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'off',
    },
  },
  {
    // Script Configuration
    files: ['**/scripts/**/*.{js,mjs,cjs,ts}'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',

      'no-console': 'off',
    },
  },
  {
    ignores: ['**/node_modules/**', '**/dist/**'],
  },
];
