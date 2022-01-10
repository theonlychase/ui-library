import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue({
      // template: {
      //   compilerOptions: {
      //     isCustomElement: (tag) => tag.includes('wc-'),
      //   },
      // },
    }),
  ],
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core', 'qs', 'keen-slider/vue.es'],
  },
});
