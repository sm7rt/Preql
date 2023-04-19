module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:react/all',
    'plugin:react-hooks/recommended',
    'next',
    'next/core-web-vitals',
    'prettier',
    'plugin:storybook/recommended',
  ],
  globals: {
    JSX: true,
    React: true,
  },
  overrides: [
    {
      extends: ['plugin:storybook/recommended'],
      // or whatever matches stories specified in .storybook/main.js
      files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
      rules: {
        'react/jsx-no-literals ': 'off',

        'react/no-multi-comp': 'off',
        'react/no-unescaped-entities': 'off',
        // example of disabling a rule
        'storybook/default-exports': 'off',
        // example of overriding a rule
        'storybook/hierarchy-separator': 'error',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
    {
      extends: ['plugin:jest/recommended'],
      files: [
        'test/**',
        '*.test.tsx',
        '*.test.jsx',
        '*.test.js',
        '*.test.ts',
        'jest.setup.js',
      ],
      plugins: ['jest'],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
        'react/function-component-definition': 0,
        'react/jsx-no-literals': 0,
        'react/no-multi-comp': 0,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'react-hooks',
    'simple-import-sort',
    'sort-keys-fix',
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    indent: ['error', 2],
    'no-mixed-operators': 'error',
    'no-tabs': 'error',
    'no-useless-escape': 'off',
    'prefer-arrow-callback': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react/forbid-component-props': 'off',
    'react/function-component-definition': 'off',
    // TODO: Revisit this later
    'react/hook-use-state': 'warn',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'react/jsx-max-depth': 'warn',
    'react/jsx-no-bind': 'off',
    'react/jsx-no-literals': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'warn',
    'react/no-multi-comp': 'warn',
    'react/require-default-props': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys-fix/sort-keys-fix': 'warn',
  },
};
