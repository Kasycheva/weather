import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: 'src',
  publicDir: '../public', // Указание на папку public
  build: {
    sourcemap: true,
    rollupOptions: {
      input: './src/index.html',
    },
    outDir: '../dist',
  },
  plugins: [injectHTML(), FullReload(['./src/**/*.html'])],
});
