# CSS Var Extract

[![npm version](https://badge.fury.io/js/css-var-extract-plugin.svg)](https://badge.fury.io/js/css-var-extract-plugin)

Use CSS variables type-safely for CSS-in-JS.

Generate at build time, has **no runtime dependencies**, and can be **optimized**.

## 🤔 Why?

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
// :root: #d3a3a3
export const primary = "var(--primary)"

// :root: #5aa68a
export const secondary = "var(--secondary)"

// :root: #fff
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

## 📦 Installation

You need to configure your project's bundler to use the CssVarExtract Plugin or the CssVarExtract CLI.

The plugin will automatically generate .ts through your bundler's dev and build processes.

### Configuration with Vite

- [examples/basic-vite-react](examples/basic-vite-react)
- [examples/with-vanilla-extract](examples/with-vanilla-extract)

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

- [examples/basic-rsbuild-react](examples/basic-rsbuild-react)

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

- [examples/basic-webpack-react](examples/basic-webpack-react)

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

### Configuration with the CSS Var Extract CLI

You need to install the `css-var-extract-cli` package.

```shell
npm i -D css-var-extract-cli
```

Once installed, you'll need to amend your scripts in your package.json for the CLI to watch and generate files.

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

## 🔧 Configuration

You can create `cve.config.json` and change settings.
If you are using a plugin, it also supports inline configuration.

You can also override the settings by the `CVE_CONFIG` environment variable.

### Priority

The lower the number, the higher the priority.

1. Environment variable: `CVE_CONFIG`
2. Inline config
3. File config `cve.config.json`

### JSON

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
  ],
  "disableLogging": false,
  "emoji": true
}
```

| Option         | Description                                                           |
|----------------|-----------------------------------------------------------------------|
| files          | CSS files that collects css variables. Set relative or absolute path. |
| output         | Path to generate the Typescript file. Set relative or absolute path.  |
| fileHeader     | Header of the generated file.                                         |
| fileFooter     | Footer of the generated file.                                         |
| disableLogging | Disable logging on generation.                                        |
| emoji          | Use emojis in logs.                                                   |

## 👏 Acknowledgments

This project was inspired by and references implementation patterns from the [TanStack Router](https://tanstack.com/router) package.
We extend our gratitude to the developers and maintainers of [TanStack Router](https://tanstack.com/router) for their excellent work.
