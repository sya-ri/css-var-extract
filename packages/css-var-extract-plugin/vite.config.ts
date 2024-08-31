import { viteConfig } from "css-var-extract-vite-config";

export default viteConfig({
    entry: [
        "./src/index.ts",
        "./src/vite.ts",
        "./src/rspack.ts",
        "./src/webpack.ts",
    ],
    srcDir: "./src",
});
