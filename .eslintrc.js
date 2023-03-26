/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    root: true,
    extends: [
        '@tinkoff/eslint-config/app',
        '@tinkoff/eslint-config-angular',

        '@tinkoff/eslint-config-angular/rxjs',
        '@tinkoff/eslint-config-angular/promise',
        '@tinkoff/eslint-config-angular/imports',
        '@tinkoff/eslint-config-angular/unicorn',
        '@tinkoff/eslint-config-angular/html-eslint',
        '@tinkoff/eslint-config-angular/file-progress',
        '@tinkoff/eslint-config-angular/line-statements',
        '@tinkoff/eslint-config-angular/member-ordering',
        '@tinkoff/eslint-config-angular/decorator-position',
        '@tinkoff/eslint-config-angular/function-return-type',

        './scripts/eslint/naming-convention.js',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: [require.resolve('./tsconfig.eslint.json')],
    },
    parser: '@typescript-eslint/parser',
    ignorePatterns: [
        'e2e',
        'schematics/**',
        '**/*spec.ts',
        '**/postinstall.ts',
        'src/**/main.ts',
        'src/**/polyfills.ts',
        '*.js',
        '*.json',
        '*.scss',
        '*.md',
        '*.html',

        // temporal
        '**/hero.service.ts',
    ],
};
