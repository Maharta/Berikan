import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        short_name: "Berikan",
        name: "Berikan",
        lang: "en",
        description:
          "Berikan is an app to share your unused things to people around you",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        dir: "ltr",
        display: "fullscreen",
        orientation: "portrait",
        icons: [
          {
            src: "/android-icon-512x512.png",
            type: "image/png",
            sizes: "512x512",
          },
          {
            src: "/apple-icon-180x180.png",
            type: "image/png",
            sizes: "180x180",
          },
          {
            src: "/apple-icon-152x152.png",
            type: "image/png",
            sizes: "152x152",
          },
          {
            src: "/apple-icon-144x144.png",
            type: "image/png",
            sizes: "144x144",
          },
          {
            src: "/apple-icon-120x120.png",
            type: "image/png",
            sizes: "120x120",
          },
          {
            src: "/apple-icon-114x114.png",
            type: "image/png",
            sizes: "114x114",
          },
          {
            src: "/favicon-96x96.png",
            type: "image/png",
            sizes: "96x96",
          },
          {
            src: "/apple-icon-76x76.png",
            type: "image/png",
            sizes: "76x76",
          },
          {
            src: "/apple-icon-72x72.png",
            type: "image/png",
            sizes: "72x72",
          },
          {
            src: "/apple-icon-60x60.png",
            type: "image/png",
            sizes: "60x60",
          },
          {
            src: "/apple-icon-57x57.png",
            type: "image/png",
            sizes: "57x57",
          },
          {
            src: "/favicon-32x32.png",
            type: "image/png",
            sizes: "32x32",
          },
          {
            src: "/favicon-16x16.png",
            type: "image/png",
            sizes: "16x16",
          },
        ],
        prefer_related_applications: false,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
});
