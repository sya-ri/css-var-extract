import { createVitePlugin } from "unplugin";
import { unpluginCssVarExtractFactory } from "./core/css-var-extract-plugin";

const CssVarExtractVite = createVitePlugin(unpluginCssVarExtractFactory);

export default CssVarExtractVite;
