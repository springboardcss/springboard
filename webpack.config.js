const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const path = require('path');

module.exports = env => { 

  const style = env.NODE_ENV === 'production' ? 'compressed' : 'expanded'
  const ext = env.NODE_ENV === 'production' ? '.min.css' : '.css'
  // const path = env.NODE_ENV === 'production' ? 'static/assets/' : ''

  return {
    entry: {
      bbq: './src/sass/index.scss',
    },
    output: {
      path: path.resolve(__dirname, 'static/assets/'),
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sassOptions: {
                  outputStyle: style, // figure out how to make this conditional Node env?
                  sourceComments: false,
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: `css/[name]${ext}`,
        chunkFilename: `css/[id]${ext}`,
      }),
    ],
  }
};