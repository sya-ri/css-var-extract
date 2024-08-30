import { describe, expect, it } from "vitest";
import extractCssVars from "../src/extractCssVars";

describe("ExtractCssVars", () => {
    it("should be extracted", () => {
        expect(extractCssVars(":root { --primary: #fff }")).toEqual({
            "--primary": {
                "": "#fff",
            },
        });
    });

    it("should be extracted multiple vars", () => {
        expect(
            extractCssVars(":root { --primary: #fff; --secondary: #000 }"),
        ).toEqual({
            "--primary": {
                "": "#fff",
            },
            "--secondary": {
                "": "#000",
            },
        });
    });

    it("should be extracted multiple blocks", () => {
        expect(
            extractCssVars(
                ":root { --primary: #fff } :root { --secondary: #000 }",
            ),
        ).toEqual({
            "--primary": {
                "": "#fff",
            },
            "--secondary": {
                "": "#000",
            },
        });
    });

    it("should be used first value", () => {
        expect(
            extractCssVars(
                ":root { --primary: #fff } :root { --primary: #000 }",
            ),
        ).toEqual({
            "--primary": {
                "": "#fff",
            },
        });
    });

    it("should be extracted with additional conditions", () => {
        expect(
            extractCssVars(
                [
                    ":root { --primary: #000 }",
                    ":root, .light { --primary: #fff }",
                ].join(""),
            ),
        ).toEqual({
            "--primary": {
                "": "#000",
                ".light": "#fff",
            },
        });
    });

    it("should be extracted even if nested", () => {
        expect(extractCssVars("@media { :root { --primary: #fff } }")).toEqual({
            "--primary": {
                "": "#fff",
            },
        });
    });

    it("should be ignored non :root", () => {
        expect(extractCssVars("body { --primary: #fff }")).toEqual({});
    });
});