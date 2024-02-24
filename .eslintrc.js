module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'prettier', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
    ignorePatterns: ['**/docker/*', '**/dist/*'],
    rules: {
        // 'no-unused-vars': 'error',
        'no-console': 'off',
        'react/display-name': 'off',
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
        '@typescript-eslint/no-unused-vars': 'error',
    },
    globals: {
        React: true,
        JSX: true,
    },
    root: true,
};
