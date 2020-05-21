import * as path from 'path';
import {
  HotModuleReplacementPlugin, LoaderOptionsPlugin,
  NamedModulesPlugin, Configuration, DefinePlugin
} from 'webpack';

const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

export default async function webpackConfig ()  {
  const config: Configuration = {
    bail: true,
    mode: 'production',
    devtool: false,
    stats: false,
    cache: false,
    entry: [
      require.resolve('@babel/polyfill'),
      path.resolve(__dirname, 'src/index.tsx')
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'app.bundle.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')]
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: require.resolve('source-map-loader'),
          enforce: 'pre',
          include: path.resolve(__dirname, 'src'),
        },
        {
          oneOf: [
            {
              test: /\.(js|jsx)$/,
              include: path.resolve(__dirname, 'src'),
              loader: require.resolve('babel-loader'),
            },
            {
              test: /\.tsx?$/,
              loader: require.resolve('ts-loader'),
              options: {
                transpileOnly: true
              }
            },
            {
              test:/\.(css|scss|sass)$/,
              loader: ExtractTextWebpackPlugin.extract({
                fallback: {
                  loader: require.resolve('style-loader'),
                  options: {
                    hmr: false
                  }
                },
                use: [
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      sourceMap: false
                    }
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: {
                      ident: 'postcss',
                      plugins: [
                        Autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9'
                          ]
                        }),
                      ],
                    },
                  },
                  {
                    loader: require.resolve('sass-loader')
                  }
                ]
              })
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, 'src/index.html'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }
      }),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
        checkSyntacticErrors: true,
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        tslint: path.resolve(__dirname, 'tslint.json'),
        watch: [path.resolve(__dirname, 'src')]
      }),
      new ExtractTextWebpackPlugin({
        filename: 'app.bundle.css'
      }),
      new NamedModulesPlugin(),
      new HotModuleReplacementPlugin(),
      new LoaderOptionsPlugin({debug: true})
    ]
  };

  return config;
}
