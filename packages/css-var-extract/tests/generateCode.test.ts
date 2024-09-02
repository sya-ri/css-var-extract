import { describe, expect, it } from "vitest";
import { generateCode } from "../src";
import type { CssVars } from "../src/types";

describe("GenerateCode", () => {
    it.each([
        [
            {
                "--primary": {
                    "": "#fff",
                },
            },
            ["// #fff", 'export const primary = "var(--primary)"'],
        ],
        [
            {
                "--primary-0": {
                    "": "#fff",
                },
            },
            ["// #fff", 'export const primary_0 = "var(--primary-0)"'],
        ],
        [
            {
                "--primary": {
                    "": "#000",
                    ".light": "#fff",
                },
            },
            [
                "// #000",
                "// .light: #fff",
                'export const primary = "var(--primary)"',
            ],
        ],
        [
            {
                "--primary": {
                    "": "#fff",
                },
                "--secondary": {
                    "": "#000",
                },
            },
            [
                "// #fff",
                'export const primary = "var(--primary)"',
                "",
                "// #000",
                'export const secondary = "var(--secondary)"',
            ],
        ],
    ] satisfies [CssVars, string[]][])(
        "should be generated vars",
        (input, output) => {
            expect(generateCode(input)).toEqual(output.join("\n"));
        },
    );
});
