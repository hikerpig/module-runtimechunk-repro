import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
	entry: {
		main: "./src/index.js",
		entry2: "./src/index2.js",
	},
	output: {
		chunkLoading: 'import',
		chunkFormat: 'module',
		filename: "static/[name].[contenthash:8].js",
		chunkFilename: "static/[name].[contenthash:8].chunk.js",
	},
	module: {
		rules: [
			{
				test: /\.svg$/,
				type: "asset"
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: "builtin:swc-loader",
						options: {
							jsc: {
								parser: {
									syntax: "ecmascript"
								}
							},
							env: { targets }
						}
					}
				]
			}
		]
	},
	plugins: [new rspack.HtmlRspackPlugin({ template: "./index.html", scriptLoading: 'module' })],
	devServer: {
		hot: false,
		liveReload: false,
		devMiddleware: {
			writeToDisk: true
		}
	},
	optimization: {
		runtimeChunk: true,
		minimize: false,
	},
	experiments: {
		css: true,
		outputModule: true
	}
});
