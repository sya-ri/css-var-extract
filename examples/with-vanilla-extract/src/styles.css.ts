import { style } from "@vanilla-extract/css";
import * as vars from "./cssVar.gen.ts";

export const buttonStyle = style({
    backgroundColor: vars.primary,
});

export const messageStyle = style({
    color: vars.secondary,
});
