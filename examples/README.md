# Examples

## [basic-rsbuild-react](basic-vite-react)

Automatically generate `.ts` using the rspack plugin.

### rsbuild.config.ts

```ts
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import CssVarExtractRspack from "css-var-extract-plugin/rspack";

export default defineConfig({
    plugins: [pluginReact()],
    tools: {
        rspack: {
            plugins: [
                CssVarExtractRspack({
                    directories: ["src/styles/"],
                }),
            ],
        },
    },
});
```

## [basic-vite-react](basic-vite-react)

Automatically generate `.ts` using the vite plugin.

### vite.config.ts

```ts
import react from "@vitejs/plugin-react";
import CssVarExtractVite from "css-var-extract-plugin/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        CssVarExtractVite({
            directories: ["src/styles/"],
        }),
        react(),
    ],
});
```
