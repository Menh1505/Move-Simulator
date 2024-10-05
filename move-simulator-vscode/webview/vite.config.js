import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        minify: 'esbuild',
        outDir: "build",
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].js`,
                chunkFileNames: `assets/[name].js`,
                assetFileNames: `assets/[name].[ext]`,
            },
        },
    },
    server: {
        port: 3000, // Chọn một cổng khả dụng
        hmr: {
            // Cấu hình Hot Module Replacement (HMR)
            protocol: "ws", // Sử dụng WebSocket cho HMR
            host: "localhost",
        },
    },
});
//# sourceMappingURL=vite.config.js.map