import { generator, getConfig } from "css-var-extract";
import * as yargs from "yargs";

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
            async ({ nocreate }: { nocreate?: boolean }) => {
                try {
                    await generator(getConfig(nocreate));
                    process.exit(0);
                } catch (err) {
                    console.error(err);
                    process.exit(1);
                }
            },
        )
        .strict()
        .demandCommand(1)
        .parse();
}
