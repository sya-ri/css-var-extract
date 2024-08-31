import { generator, getConfig } from "css-var-extract";

export const generate = async (nocreate?: boolean) => {
    try {
        await generator(getConfig(nocreate));
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
