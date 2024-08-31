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

## [with-vanilla-extract](with-vanilla-extract)

### vite.config.ts

```ts
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
```

### styles.css.ts

```ts
import { style } from "@vanilla-extract/css";
import * as vars from "./cssVar.gen.ts";

export const buttonStyle = style({
    backgroundColor: vars.primary,
});

export const messageStyle = style({
    color: vars.secondary,
});
```
