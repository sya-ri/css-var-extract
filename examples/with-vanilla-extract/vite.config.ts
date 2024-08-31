import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import CssVarExtractVite from "css-var-extract-plugin/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        CssVarExtractVite({
            files: ["src/theme.css"],
        }),
        vanillaExtractPlugin(),
        react(),
    ],
});
