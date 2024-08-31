import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

function ensureImportFileExtension(content: string, extension: string) {
    // replace e.g. `import { foo } from './foo'` with `import { foo } from './foo.js'`
    let output = content.replace(
        /(im|ex)port\s[\w{}/*\s,]+from\s['"]\.\.?\/[^.'"]+(?=['"];?)/gm,
        `$&.${extension}`,
    );

    // replace e.g. `import('./foo')` with `import('./foo.js')`
    output = output.replace(
        /import\(['"]\.\.?\/[^.'"]+(?=['"];?)/gm,
        `$&.${extension}`,
    );
    return output;
}

type ViteConfigOptions = {
    srcDir: string;
    entry: string;
};

export const viteConfig = (options: ViteConfigOptions) => {
    return defineConfig({
        plugins: [
            externalizeDeps(),
            dtsPlugin({
                outDir: "dist/esm",
                entryRoot: options.srcDir,
                include: options.srcDir,
                compilerOptions: {
                    module: 99, // ESNext,
                    declarationMap: false,
                },
                beforeWriteFile: (filePath, content) => ({
                    filePath,
                    content: ensureImportFileExtension(content, "js"),
                }),
            }),
            dtsPlugin({
                outDir: "dist/cjs",
                entryRoot: options.srcDir,
                include: options.srcDir,
                compilerOptions: {
                    module: 1, // CommonJS
                    declarationMap: false,
                },
                beforeWriteFile: (filePath, content) => ({
                    filePath: filePath.replace(".d.ts", ".d.cts"),
                    content: ensureImportFileExtension(content, "cjs"),
                }),
            }),
        ],
        build: {
            outDir: "dist",
            minify: false,
            sourcemap: true,
            lib: {
                entry: options.entry,
                formats: ["es", "cjs"],
                fileName: (format) => {
                    if (format === "cjs") return "cjs/[name].cjs";
                    return "esm/[name].js";
                },
            },
        },
    });
};
