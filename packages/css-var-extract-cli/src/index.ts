import * as fs from "node:fs/promises";
import { extractCssVars, generateCode } from "css-var-extract";
import * as yargs from "yargs";

main();

export function main() {
    yargs
        // @ts-expect-error
        .scriptName("cve")
        .usage("$0 <cmd> [args]")
        .command(
            "generate <files...>",
            "Generate the routes for a project",
            (yargs: yargs.Argv) =>
                yargs
                    .positional("files", {
                        describe: "Input css file",
                        type: "string",
                        array: true,
                    })
                    .option("output", {
                        alias: "o",
                        type: "string",
                        default: "css-var.gen.ts",
                    }),
            async ({ files, output }: { files: string[]; output: string }) => {
                const cssVars = await Promise.all(
                    files
                        .map((file) => fs.readFile(file, "utf-8"))
                        .map((content) => content.then(extractCssVars)),
                );
                await fs.writeFile(
                    output,
                    generateCode(Object.assign({}, ...cssVars)),
                    "utf-8",
                );
            },
        )
        .strict()
        .demandCommand(1)
        .parse();
}
