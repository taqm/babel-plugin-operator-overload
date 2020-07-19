module.exports = {
  extends: 'airbnb-base',
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
      rules: {
        'no-useless-computed-key': 'off',
        'object-shorthand': 'off',
        'no-bitwise': 'off',
        'no-labels': 'off',
        'no-restricted-syntax': 'off',
        'no-unused-labels': 'off',
      }
    },
  ],
};
