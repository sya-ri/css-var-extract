# CSS Var Extract

Use CSS variables type-safely for CSS-in-JS.

## Why?

Type-safely access CSS variables created by yourself or by external component libraries from TypeScript.

```css
:root {
    --primary: #d3a3a3;
    --secondary: #5aa68a;
    --white: #fff;
}
```

Automatically generate `.ts` files based on `.css`.

```ts
// #d3a3a3
export const primary = "var(--primary)"

// #5aa68a
export const secondary = "var(--secondary)"

// #fff
export const white = "var(--white)"
```

It can be used in `styles` and also in CSS-in-JS such as [vanilla-extract](https://vanilla-extract.style).

```tsx
import "./theme.css";
import * as vars from "./cssVar.gen";

const App = () => {
    return (
        <div style={{ backgroundColor: vars.primary }}>
            <h1 style={{ color: vars.primary }}>
                Primary color
            </h1>
            <p style={{ color: vars.secondary }}>
                Secondary color
            </p>
        </div>
    );
};

export default App;
```

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

## Installation

You need to configure your project's bundler to use the CssVarExtract Plugin or the CssVarExtract CLI.

The plugin will automatically generate .ts through your bundler's dev and build processes.

### Configuration with Vite

- [examples/basic-vite-react](examples/basic-vite-react)

You need to install the `css-var-extract-plugin` package.

```shell
npm i -D css-var-extract-plugin
```

Once installed, you'll need to add the plugin to your Vite configuration.

```ts
// vite.config.ts
import react from "@vitejs/plugin-react";
import CssVarExtractVite from "css-var-extract-plugin/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        CssVarExtractVite({
            files: ["src/theme.css"],
        }),
        react(),
    ],
});
```

### Configuration with Rspack/Rsbuild

You need to install the `css-var-extract-plugin` package.

```shell
npm i -D css-var-extract-plugin
```

Once installed, you'll need to add the plugin to your configuration.

```ts
// rsbuild.config.ts
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import CssVarExtractRspack from "css-var-extract-plugin/rspack";

export default defineConfig({
    plugins: [pluginReact()],
    tools: {
        rspack: {
            plugins: [
                CssVarExtractRspack({
                    files: ["src/theme.css"],
                }),
            ],
        },
    },
});
```

### Configuration with Webpack

You need to install the `css-var-extract-plugin` package.

```shell
npm i -D css-var-extract-plugin
```

Once installed, you'll need to add the plugin to your configuration.

```ts
// webpack.config.ts
import CssVarExtractWebpack from "css-var-extract-plugin/webpack"

export default {
    plugins: [CssVarExtractWebpack({
        files: ["src/theme.css"],
    })],
}
```

### Configuration with the TanStack Router CLI

You need to install the `css-var-extract-cli` package.

```shell
npm i -D css-var-extract-cli
```

Once installed, you'll need to amend your your scripts in your package.json for the CLI to watch and generate files.

```json
{
  "scripts": {
    "generate-css-var": "cve generate",
    "watch-css-var": "cve watch",
    "build": "npm run generate-css-var && ...",
    "dev": "npm run watch-css-var && ..."
  }
}
```

With the CLI installed, the following commands are made available via the `cve` command

#### Using the `generate` command

Generates the `.ts` file based on the provided configuration.

```shell
cve generate
```

#### Using the `watch` command

Continuously watches the specified files and regenerates the `.ts` file as needed.

```shell
cve watch
```

## Configuration

You can create `cve.config.json` and change settings.
If you are using a plugin, it also supports inline configuration.

### cve.config.json

```json
{
  "files": [],
  "output": "./src/cssVar.gen.ts",
  "fileHeader": [
    "/* prettier-ignore-start */",
    "/* eslint-disable */",
    "// @ts-nocheck",
    "// noinspection JSUnusedGlobalSymbols"
  ],
  "fileFooter": [
    "/* prettier-ignore-end */"
  ]
}
```
