import { viteConfig } from "css-var-extract-vite-config";
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";

export default mergeConfig(
    defineConfig({
        test: {
            watch: false,
        },
    }),
    viteConfig({
        srcDir: "./src",
        entry: "./src/index.ts",
    }),
);
