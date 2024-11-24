import { defineConfig } from 'vite';
import { globSync } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  root: 'src',
  build: {
    sourcemap: true,
    rollupOptions: {
      input: globSync('./src/*.html'), // Используем globSync
    },
    outDir: '../dist',
  },
  plugins: [injectHTML(), FullReload(['./src/**/*.html'])],
});
