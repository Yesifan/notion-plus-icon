module.exports = {
  root: true,
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  globals: {
    chrome: 'readonly',
  },
  rules: {
    'import/no-cycle': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'import/prefer-default-export': 0,
    "@typescript-eslint/no-shadow": 0,
    "@typescript-eslint/no-use-before-define": 0
  },
};