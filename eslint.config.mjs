import antfu from '@antfu/eslint-config';

export default antfu({
    rules: {
        'jsonc/indent': ['error', 4],
        'style/indent': ['error', 4],
        'style/jsx-indent': ['error', 4],
        'style/jsx-indent-props': ['error', 'first'],
        'style/block-spacing': ['error', 'never'],
        'style/object-curly-spacing': ['error', 'never'],
        'style/semi': ['error', 'always'],
        'no-console': ['error', {allow: ['info', 'warn', 'error']}],
    },
});
