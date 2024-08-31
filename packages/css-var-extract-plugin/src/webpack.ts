import { createWebpackPlugin } from "unplugin";
import { unpluginCssVarExtractFactory } from "./core/css-var-extract-plugin";

const CssVarExtractWebpack = createWebpackPlugin(unpluginCssVarExtractFactory);

export default CssVarExtractWebpack;
