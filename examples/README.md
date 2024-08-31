# Examples

## [basic-rsbuild-react](basic-vite-react)

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

### App.tsx

```tsx
import "./App.css";
import "./theme.css";
import * as vars from "./cssVar.gen";

const App = () => {
    return (
        <div className="content">
            <h1 style={{ color: vars.primary }}>Rsbuild with React</h1>
            <p style={{ color: vars.secondary }}>
                Start building amazing things with Rsbuild.
            </p>
        </div>
    );
};

export default App;
```

## [basic-vite-react](basic-vite-react)

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

### App.tsx

```tsx
import "./App.css";
import * as vars from "./cssVar.gen";

function App() {
    return (
        <div>
            <h1 style={{ color: vars.primary }}>Vite + React</h1>
            <p style={{ color: vars.secondary }}>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
    );
}

export default App;
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

### App.tsx

```tsx
import "./App.css";
import { headerStyle, messageStyle } from "./styles.css.ts";

function App() {
    return (
        <div>
            <h1 className={headerStyle}>Vite + React</h1>
            <p className={messageStyle}>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
    );
}

export default App;
```
