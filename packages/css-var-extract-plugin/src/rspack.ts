import { createRspackPlugin } from "unplugin";
import { unpluginCssVarExtractFactory } from "./core/css-var-extract-plugin";

const CssVarExtractRspack = createRspackPlugin(unpluginCssVarExtractFactory);

export default CssVarExtractRspack;
