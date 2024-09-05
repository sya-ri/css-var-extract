export const logging = (config: { disabled: boolean; emoji: boolean }) => {
    const icon = config.emoji ? "🍄" : "*";
    return {
        log: (message: string) => {
            if (!config.disabled) console.log(`${icon}  ${message}`);
        },
        info: (message: string) => {
            if (!config.disabled) console.info(`${icon}  ${message}`);
        },
        warn: (message: string) => {
            if (!config.disabled) console.warn(`${icon}  ${message}`);
        },
        error: (message: string) => {
            if (!config.disabled) console.error(`${icon}  ${message}`);
        },
    };
};
