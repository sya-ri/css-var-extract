import path from "node:path";
import chokidar from "chokidar";
import { generator, getConfig } from "css-var-extract";

export const watch = async (nocreate?: boolean) => {
    const configWatcher = chokidar.watch(
        path.resolve(process.cwd(), "cve.config.json"),
    );

    let watcher = new chokidar.FSWatcher({});

    const generatorWatcher = () => {
        const config = getConfig();

        watcher.close();

        console.info(`CVE: Watching files (${config.files})...`);
        watcher = chokidar.watch(config.files);

        watcher.on("ready", async () => {
            const handle = async () => {
                try {
                    await generator(config);
                } catch (err) {
                    console.error(err);
                    console.info();
                }
            };

            await handle();

            let timeout: ReturnType<typeof setTimeout> | undefined;

            const deduped = (_file: string) => {
                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(handle, 10);
            };

            watcher.on("change", deduped);
            watcher.on("add", deduped);
            watcher.on("unlink", deduped);
        });
    };

    configWatcher.on("ready", generatorWatcher);
    configWatcher.on("change", generatorWatcher);
};
