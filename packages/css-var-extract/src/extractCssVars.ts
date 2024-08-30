type CssVars = Record<string, Record<string, string>>;

const extractCssVars = (css: string): CssVars => {
    const rootRegex = /:root(,(.*))?\s*\{([^}]*)}/g;
    const cssVars: CssVars = {};
    while (true) {
        const root = rootRegex.exec(css);
        if (!root) break;
        const condition = root[2]?.trim() ?? "";
        const cssVarRegex = /\s*(--[^;]*):([^;]*);?\n*/g;
        while (true) {
            const cssVar = cssVarRegex.exec(root[3]);
            if (!cssVar) break;
            const name = cssVar[1].trim();
            cssVars[name] = {
                [condition]: cssVar[2].trim(),
                ...cssVars[name],
            };
        }
    }
    return cssVars;
};

export default extractCssVars;
