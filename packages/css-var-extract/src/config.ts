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

export const getConfig = (
    noCreate?: boolean,
    inlineConfig: Partial<Config> = {},
    configDirectory?: string,
): Config => {
    const configFilePathJson = path.resolve(
        configDirectory ?? process.cwd(),
        "cve.config.json",
    );
    const exists = fs.existsSync(configFilePathJson);

    let config: Config;
    if (exists) {
        config = configSchema.parse({
            ...JSON.parse(fs.readFileSync(configFilePathJson, "utf-8")),
            ...inlineConfig,
        });
    } else {
        config = configSchema.parse(inlineConfig);
        if (!noCreate) {
            fs.writeFileSync(
                configFilePathJson,
                JSON.stringify(config, null, 2),
                "utf-8",
            );
        }
    }

    if (configDirectory) {
        if (path.isAbsolute(configDirectory)) {
            config.files = config.files.map((file) =>
                path.resolve(configDirectory, file),
            );
            config.output = path.resolve(configDirectory, config.output);
        } else {
            config.files = config.files.map((file) =>
                path.resolve(process.cwd(), configDirectory, file),
            );
            config.output = path.resolve(
                process.cwd(),
                configDirectory,
                config.output,
            );
        }
    }

    return config;
};
