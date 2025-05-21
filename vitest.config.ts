import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./packages/server/src/__tests__/setup.ts'],
  },
}); 