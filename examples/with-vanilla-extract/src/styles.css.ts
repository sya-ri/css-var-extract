import { style } from "@vanilla-extract/css";
import * as vars from "./cssVar.gen.ts";

export const headerStyle = style({
    color: vars.primary,
});

export const messageStyle = style({
    color: vars.secondary,
});
