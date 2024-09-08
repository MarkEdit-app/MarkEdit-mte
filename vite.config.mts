import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        '@codemirror/view',
        '@codemirror/state',
        '@codemirror/language',
        '@codemirror/search',
        '@codemirror/commands',
        '@lezer/common',
        '@lezer/highlight',
        '@lezer/lr',
      ],
    },
    lib: {
      entry: 'main.ts',
      formats: ['cjs'],
    },
  },
});
