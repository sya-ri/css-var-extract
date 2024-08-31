import * as yargs from "yargs";
import { generate } from "./generate";
import { watch } from "./watch";

main();

export function main() {
    yargs
        // @ts-expect-error
        .scriptName("cve")
        .usage("$0 <cmd> [args]")
        .command(
            "generate",
            "Generate the TypeScript file from CSS files",
            (yargs: yargs.Argv) =>
                yargs.option("nocreate", {
                    describe: "Disable the creation of a config file",
                    type: "boolean",
                }),
            async ({ nocreate }: { nocreate?: boolean }) => generate(nocreate),
        )
        .command(
            "watch",
            "Continuously watch and generate the TypeScript file from CSS files",
            (yargs: yargs.Argv) =>
                yargs.option("nocreate", {
                    describe: "Disable the creation of a config file",
                    type: "boolean",
                }),
            async ({ nocreate }: { nocreate?: boolean }) => watch(nocreate),
        )
        .strict()
        .demandCommand(1)
        .parse();
}
