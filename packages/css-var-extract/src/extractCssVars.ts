import type { CssVars } from "./types";

export const extractCssVars = (css: string): CssVars => {
    const rootRegex = /([^{}]*)\{([^{}]*)}/g;
    const cssVars: CssVars = {};
    while (true) {
        const root = rootRegex.exec(css);
        if (!root) break;
        const condition = root[1]?.trim() ?? "";
        if (!root[2]) break;
        const cssVarRegex = /\s*(--[^;]*):([^;]*);?\n*/g;
        while (true) {
            const cssVar = cssVarRegex.exec(root[2]);
            if (!cssVar || !cssVar[1] || !cssVar[2]) break;
            const name = cssVar[1].trim();
            cssVars[name] = {
                [condition]: cssVar[2].trim(),
                ...cssVars[name],
            };
        }
    }
    return cssVars;
};
