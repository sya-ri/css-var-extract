import { generator, getConfig } from "css-var-extract";
import * as yargs from "yargs";
import { generate } from "./generate";

main();

export function main() {
    yargs
        // @ts-expect-error
        .scriptName("cve")
        .usage("$0 <cmd> [args]")
        .command(
            "generate",
            "Generate a TypeScript file from CSS files",
            (yargs: yargs.Argv) =>
                yargs.option("nocreate", {
                    describe: "Disable the creation of a config file",
                    type: "boolean",
                }),
            async ({ nocreate }: { nocreate?: boolean }) => generate(nocreate),
        )
        .strict()
        .demandCommand(1)
        .parse();
}
