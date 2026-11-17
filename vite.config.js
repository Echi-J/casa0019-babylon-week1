import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
        base: "/casa0019-babylon-week1/",
    build: {
        target: "esnext",
    },

    plugins: [
        VitePWA({
            registerType: "autoUpdate",

            manifest: {
                name: "One Pool Street Digital Replica",
                short_name: "Digital Replica",
                description: "Explore an interactive 3D building model.",
                theme_color: "#121212",
                background_color: "#121212",
                display: "standalone",

                icons: [
                    {
                        src: "img/icon/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "img/icon/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },

            workbox: {
                maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
                globPatterns: [
                    "**/*.{js,css,html,png,svg,glb}",
                ],
            },
        }),
    ],
});