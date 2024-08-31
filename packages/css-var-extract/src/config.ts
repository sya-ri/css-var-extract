import fs from "node:fs";
import * as path from "node:path";
import { z } from "zod";

export const configSchema = z.object({
    files: z.array(z.string()).optional().default([]),
    output: z.string().optional().default("./src/cssVar.gen.ts"),
    fileHeader: z
        .array(z.string())
        .optional()
        .default([
            "/* prettier-ignore-start */",
            "/* eslint-disable */",
            "// @ts-nocheck",
            "// noinspection JSUnusedGlobalSymbols",
        ]),
    fileFooter: z
        .array(z.string())
        .optional()
        .default(["/* prettier-ignore-end */"]),
});

export type Config = z.infer<typeof configSchema>;

export const getConfig = (noCreate?: boolean): Config => {
    const configFilePathJson = path.resolve(process.cwd(), "cve.config.json");
    const exists = fs.existsSync(configFilePathJson);

    let config: Config;
    if (exists) {
        config = configSchema.parse(
            JSON.parse(fs.readFileSync(configFilePathJson, "utf-8")),
        );
    } else {
        config = configSchema.parse({});
        if (!noCreate) {
            fs.writeFileSync(
                configFilePathJson,
                JSON.stringify(config, null, 2),
                "utf-8",
            );
        }
    }

    return config;
};
