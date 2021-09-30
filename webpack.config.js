/**
 * ==============
 * Webpack config
 * ==============
 */
// Project  config
const config = require('./config.js')

// Webpack plugins
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
  // Production mode
  const isProduction = (argv.mode === "production");
  const useBrowserSync = config.useBrowserSync;
  const isStrictMode = 'strict' in config ? config.strict : true;
  const isWatchMode = !!argv.watch;
  const jsSrcPaths = [config.srcPath];

  // Output Webpack mode
  console.log("Webpack is in " + argv.mode + " mode");

  // Output config
  if (isStrictMode) {
    console.log("Building app in strict mode");
  }

  if (isWatchMode) {
    console.log("Use BrowserSync: " + useBrowserSync);
  }

  // Define plugins
  let webpackPlugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CopyPlugin({
      patterns: [
        { from: "./fonts", to: "fonts" },
        { from: "./images", to: "images" }
      ],
    }),
    new ImageminPlugin({
      disable: ! isProduction,
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: {
        optimizationLevel: 7
      }
    })
  ]

  // Define optional plugins
  if (useBrowserSync && 'browserSync' in config)  {
    const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
    webpackPlugins.push(
      new BrowserSyncPlugin(config.browserSync,
        {
          injectCss: true
        }
      )
    );
  }

  if (isStrictMode && !isProduction) {
    const StylelintPlugin = require("stylelint-webpack-plugin");
    webpackPlugins.push(
      new StylelintPlugin({
        configFile: ".stylelintrc",
        failOnError: true,
        failOnWarning: false,
        emitError: false,
        emitWarning: true,
        // quiet: true,
      })
    );
  }

  // Return WebPack config
  return {
    context: config.srcPath,
    entry: ["./js/index.js", "./scss/main.scss"],
    output: {
      path: config.distPath,
      publicPath: config.distPublicPath,
      filename: "bundle.js",
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserJSPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
          extractComments: false
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false
            }
          },
          cssProcessorPluginOptions: {
            preset: ["default", { discardComments: { removeAll: true } }],
          },
        }),
      ],
      runtimeChunk: false,
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(css|s[ac]ss)$/i,
          exclude: /node_modules/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: "css-loader", options: { sourceMap: true, url: false } },
            { loader: "postcss-loader", options: { sourceMap: true } },
            { loader: "sass-loader", options: { sourceMap: true } },
          ],
        },
        {
          test: /\.js$/,
          include: 'jsSrcPaths' in config ? jsSrcPaths.concat(config.jsSrcPaths) : jsSrcPaths,
          use: {
            loader: "babel-loader"
          },
        },
      ],
    },
    plugins: webpackPlugins,
    stats: {
      children: false
    },
  }
}
