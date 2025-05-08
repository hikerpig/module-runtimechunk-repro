import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from '@rspack/cli'
import { rspack } from '@rspack/core'

const __dirname = dirname(fileURLToPath(import.meta.url))
const isDev = process.env.NODE_ENV === 'development'

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14']

const shouldReactRefresh = false
export default defineConfig({
  context: __dirname,
  entry: {
    main: './src/main.jsx',
    entry2: './src/entry2.ts',
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  devServer: {
    hot: false,
    liveReload: false,
  },
  performance: {
    hints: false,
  },
  stats: {
    chunks: true,
    modules: false,
    assets: false,
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'typescript',
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                    development: shouldReactRefresh,
                    refresh: shouldReactRefresh,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ].filter(Boolean),
  optimization: {
    runtimeChunk: 'single',
    concatenateModules: true, // turn this on and module.orphan is weird
  },
  experiments: {
    css: true,
  },
})
