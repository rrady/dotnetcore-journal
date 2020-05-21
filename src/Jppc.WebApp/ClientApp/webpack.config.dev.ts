import * as path from 'path';
import {
  LoaderOptionsPlugin, NamedModulesPlugin,
  Configuration, DefinePlugin
} from 'webpack';

const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

export default async function webpackConfig ()  {
  const config: Configuration = {
    bail: false,
    mode: 'development',
    devtool: 'cheap-module-source-map',
    stats: true,
    cache: true,
    entry: [
      require.resolve('@babel/polyfill'),
      require.resolve('react-hot-loader/patch'),
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
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: require.resolve('source-map-loader'),
          enforce: 'pre',
          include: path.resolve(__dirname, 'src'),
        },
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
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: {
                sourceMap: true
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                plugins: [
                  Autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9'
                    ]
                  })
                ]
              }
            },
            {
              loader: require.resolve('sass-loader')
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/index.html')
      }),
      new DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
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
      new LoaderOptionsPlugin({debug: true})
    ]
  };

  return config;
}
