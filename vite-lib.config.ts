import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.js'),
      name: 'UiLibrary',
      fileName: (format) => `ui-library.${format}.js`,
    },
    cssCodeSplit: true,
    outDir: 'lib/dist',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  publicDir: false,
  plugins: [vue({})],
});
