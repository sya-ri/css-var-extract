import path from "node:path";
import { type Config, generator, getConfig } from "css-var-extract";
import type { UnpluginFactory } from "unplugin";

let lock = false;
const checkLock = () => lock;
const setLock = (bool: boolean) => {
    lock = bool;
};

export const unpluginCssVarExtractFactory: UnpluginFactory<
    Partial<Config> | undefined
> = (options) => {
    let root = process.cwd();
    let userConfig = options as Config;

    const getFilePaths = () =>
        userConfig.files.map((file) =>
            path.isAbsolute(file) ? file : path.join(root, file),
        );

    const generate = async () => {
        if (checkLock()) {
            return;
        }

        setLock(true);

        try {
            await generator(userConfig);
        } catch (err) {
            console.error(err);
            console.info();
        } finally {
            setLock(false);
        }
    };

    const handleFile = async (
        file: string,
        event: "create" | "update" | "delete",
    ) => {
        const filePath = path.normalize(file);

        if (filePath === path.join(root, "cve.config.json")) {
            userConfig = getConfig(true, userConfig, root);
            return;
        }

        if (
            event === "update" &&
            filePath === path.resolve(userConfig.output)
        ) {
            // skip generating if the generated file is updated
            return;
        }

        if (getFilePaths().includes(filePath)) {
            await generate();
        }
    };

    return {
        name: "router-generator-plugin",
        async watchChange(id, { event }) {
            await handleFile(id, event);
        },
        vite: {
            async configResolved(config) {
                root = config.root;
                userConfig = getConfig(true, userConfig, root);

                await generate();
            },
        },
        async rspack(compiler) {
            userConfig = getConfig(true, userConfig, root);

            // rspack watcher doesn't register newly created files
            if (compiler.options.mode === "production") {
                await generate();
            } else {
                const filePaths = getFilePaths();
                const chokidar = await import("chokidar");
                chokidar.watch(filePaths).on("add", async () => {
                    await generate();
                });
            }
        },
        async webpack(compiler) {
            userConfig = getConfig(true, userConfig, root);

            // webpack watcher doesn't register newly created files
            if (compiler.options.mode === "production") {
                await generate();
                compiler.hooks.done.tap("unplugin:css-var-extract", () => {
                    console.info(
                        "✅ unplugin:css-var-extract: generation done",
                    );
                    setTimeout(() => {
                        process.exit(0);
                    });
                });
            } else {
                const filePaths = getFilePaths();
                const chokidar = await import("chokidar");
                chokidar.watch(filePaths).on("add", async () => {
                    await generate();
                });
            }
        },
    };
};
