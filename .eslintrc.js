module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'airbnb/hooks',
        'airbnb-typescript',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:import/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            },
        },
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'no-console': 'warn',
        'no-plusplus': 'off',
        'no-else-return': 'off',
        'no-restricted-syntax': 'off',
        'no-multiple-empty-lines': [
            'error',
            {
                max: 1,
            },
        ],
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
            },
        ],
        'space-before-function-paren': ['error', 'always'],
        'max-len': [
            'error',
            {
                code: 140,
                tabWidth: 4,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off',
        'nonblock-statement-body-position': ['error', 'below'],
        camelcase: [
            'error',
            {
                properties: 'never',
                ignoreDestructuring: true,
            },
        ],
        'no-prototype-builtins': 'off',
        'no-await-in-loop': 'off',
        'react/display-name': 'off',
        'no-underscore-dangle': [
            'error',
            {
                allow: [],
                allowAfterThis: true,
                allowAfterSuper: false,
                enforceInMethodNames: true,
            },
        ],
        'no-console': 'off',
        'no-nested-ternary': 'off',
        'nonblock-statement-body-position': ['error', 'beside'],
        'newline-after-var': 'error',
        'jsx-quotes': ['error', 'prefer-double'],
        'max-len': 'off',
        'import/no-unresolved': 'warn',
        'import/no-cycle': 'off',
        'react/display-name': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-wrap-multilines': [
            'error',
            {
                declaration: 'parens-new-line',
                assignment: 'parens-new-line',
                return: 'parens-new-line',
                arrow: 'parens-new-line',
                condition: 'parens-new-line',
                logical: 'parens-new-line',
                prop: 'parens-new-line',
            },
        ],
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/indent': [
            'error',
            4,
            {
                SwitchCase: 1,
                /**
                 * Need to ignore rule on class files with decorator to avoid over-indented attribute
                 * https://github.com/typescript-eslint/typescript-eslint/issues/1824
                 */
                ignoredNodes: [
                    'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
                ],
            },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'no-public',
            },
        ],
        '@typescript-eslint/lines-between-class-members': [
            'error',
            'always',
            {
                exceptAfterSingleLine: true,
            },
        ],
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/space-before-function-paren': ['error', 'always'],
        '@typescript-eslint/type-annotation-spacing': 'error',
    },
};
