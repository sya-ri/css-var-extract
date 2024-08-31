import path from "node:path";
import { fileURLToPath } from "node:url";
import CssVarExtractWebpack from "css-var-extract-plugin/webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/** @type import('webpack').Configuration */
export default ({ WEBPACK_SERVE }) => ({
    target: "web",
    mode: WEBPACK_SERVE ? "development" : "production",
    entry: path.resolve(__dirname, "./src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html"),
            filename: "index.html",
        }),
        CssVarExtractWebpack({
            files: ["src/theme.css"],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /(node_modules)/,
                use: { loader: "swc-loader" },
            },
            {
                test: /\.css/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        open: true,
        hot: true,
        historyApiFallback: {
            rewrites: [{ from: /./, to: "/index.html" }],
        },
        static: ["public"],
    },
});
