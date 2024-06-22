/** @type {import('stylelint').Config} */
export default {
    extends: ['stylelint-config-standard', 'stylelint-config-idiomatic-order'],
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules: {
        'block-no-empty': true,
        'at-rule-no-unknown': null,
    },
};
