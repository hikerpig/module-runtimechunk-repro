const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ['chrome >= 87', 'edge >= 88', 'firefox >= 78', 'safari >= 14'];

const shouldReactRefresh = false;

module.exports = {
  context: __dirname,
  entry: {
    main: './src/main.jsx',
    entry2: './src/entry2.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist-webpack'),
    clean: true,
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
        use: {
          loader: 'swc-loader',
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
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    concatenateModules: true,
  },
};