import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    vue(),
    commonjs(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/primeicons/fonts/*',
          dest: 'builded-app-offline/assets/fonts'
        }, {
          src: 'node_modules/primeicons/primeicons.css',
          dest: 'builded-app-offline/assets'
        }
      ]
    }),
    createHtmlPlugin({
      inject: {
        data: {
          injectLink: '<link rel="stylesheet" crossorigin href="/assets/css/primeicons.css">',
        },
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'builded-app-offline/assets/[name].js',
        chunkFileNames: 'builded-app-offline/assets/[name].js',
        assetFileNames: 'builded-app-offline/assets/[name].[ext]',
      },
    },
    minify: false,
  },
  optimizeDeps: {
    include: ['pdfmake/build/pdfmake', 'pdfmake/build/vfs_fonts'],
  },
});