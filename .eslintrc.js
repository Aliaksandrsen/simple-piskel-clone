module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
        jest: true,
    },
    parser: 'babel-eslint',
    extends: [
        'airbnb-base',
        'plugin:jest/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    rules: {
        'import/no-cycle': 0,
        'linebreak-style': 0,
        'import/no-mutable-exports': 0,
        'import/named': 0,
        'import/prefer-default-export': 0,
    },
};