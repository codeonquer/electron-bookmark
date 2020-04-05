const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 源文件常量
const SRC_PATH = path.resolve(__dirname, 'src/render/');
const SRC_APP_PATH = path.resolve(SRC_PATH, 'app.js');

// 目标文件常量
const DEV_PUBLIC_PATH = 'dev/';
const DEV_PATH = path.resolve(__dirname, DEV_PUBLIC_PATH);
const PRO_PUBLIC_PATH = 'dist/';
const PRO_PATH = path.resolve(__dirname, PRO_PUBLIC_PATH);

// 环境常量
const IS_DEV = process.env.BUILD_ENV === 'development';

module.exports = {
  target: 'electron-renderer',
  context: __dirname,
  mode: IS_DEV ? 'development' : 'production',
  entry: ['@babel/polyfill', SRC_APP_PATH],
  output: {
    path: IS_DEV ? DEV_PATH : PRO_PATH,
    publicPath: IS_DEV ? DEV_PUBLIC_PATH : PRO_PUBLIC_PATH,
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              'presets': [
                ['@babel/preset-env', {
                  'useBuiltIns': 'entry',
                  'modules': false
                }],
                '@babel/preset-react'
              ],
              'plugins': ['@babel/plugin-proposal-class-properties']
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/render/template.html',
      // HtmlWebpackPlugin 中 filename 所指路径是相对于 output.path 的，所以添加 ../
      filename: '../index.html',
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true,
        useShortDoctype: true,
        html5: true
      }
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    runtimeChunk: {
      name: 'webpack_runtime'
    },
    splitChunks: {
      minSize: 0,
      chunks: 'all',
      cacheGroups: {
        'vendor': {
          test: function (module) {
            if (
              module.resource &&
              module.resource.indexOf(path.resolve(__dirname, 'node_modules')) >= 0
            ) {
              return true;
            }
            return false;
          },
          name: 'vendor',
          chunks: 'all',
          reuseExistingChunk: true
        }
      }
    },
    minimizer: IS_DEV ? [] : [
      new UglifyJsPlugin({
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: { removeAll: true },
          // cssnano 集成了autoprefixer的功能
          // 会使用到autoprefixer进行无关前缀的清理
          // Removes unnecessary prefixes based on the browsers option. Note that by default, it will not add new prefixes to the CSS file.
          autoprefixer: false
        }
      })
    ]
  }
};
