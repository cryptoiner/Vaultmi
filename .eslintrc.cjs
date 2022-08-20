module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:snarkyjs/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint', 'snarkyjs'],
  rules: {
    'snarkyjs/no-greater-storage-limit-in-circuit': 'off',
  },
};
