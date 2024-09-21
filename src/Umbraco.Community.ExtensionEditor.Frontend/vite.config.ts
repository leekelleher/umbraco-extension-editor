import { defineConfig } from "vite";
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    build: {
        lib: {
            entry: "src/manifests.ts",
            formats: ["es"],
        },
        outDir: './../Umbraco.Community.ExtensionEditor.Backend/wwwroot/App_Plugins/ExtensionEditor',
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/],
            output: {
                chunkFileNames: '[name].js',
            }
        },
    },
});
