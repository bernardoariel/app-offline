import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import commonjs from "@rollup/plugin-commonjs";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    vue(),
    commonjs(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/primeicons/fonts/*",
          dest: "assets/fonts",
        },
        {
          src: "node_modules/primeicons/primeicons.css",
          dest: "assets",
        },
        {
          src: "node_modules/pdfmake/build/pdfmake.js",
          dest: "assets/pdf",
        },
        {
          src: "node_modules/pdfmake/build/vfs_fonts.js",
          dest: "assets/pdf",
        },
      ],
    }),
    createHtmlPlugin({
      inject: {
        data: {
          injectLink:
            '<link rel="stylesheet" crossorigin href="/assets/primeicons.css">',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    minify: false,
  },
  optimizeDeps: {
    include: ["pdfmake/build/pdfmake", "pdfmake/build/vfs_fonts"],
  },
});
