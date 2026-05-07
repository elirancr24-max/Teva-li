// Minimal flat config; Next 15 ships its own rules, we just disable noise.
export default [
  {
    ignores: ['.next/**', 'node_modules/**'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
];
