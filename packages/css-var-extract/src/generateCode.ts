import type { CssVars } from "./types";

export const generateCode = (cssVars: CssVars): string => {
    return Object.entries(cssVars)
        .map(([name, values]) => {
            const output = [];
            for (const [condition, value] of Object.entries(values)) {
                if (condition) {
                    output.push(`// ${condition}: ${value}`);
                } else {
                    output.push(`// ${value}`);
                }
            }
            output.push(
                `export const ${name.substring(2).replaceAll("-", "_")} = "var(${name})"`,
            );
            return output.join("\n");
        })
        .join("\n\n");
};
