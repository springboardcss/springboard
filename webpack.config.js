const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const path = require('path');

module.exports = env => { 

  const style = env.NODE_ENV === 'production' ? 'compressed' : 'expanded'
  const ext = env.NODE_ENV === 'production' ? '.min.css' : '.css'
  const target = env.NODE_ENV === 'production' ? 'dist' : 'dev'


  return {
    entry: {
      bbq: './src/sass/index.scss',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
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
        filename: `[name]${ext}`,
        chunkFilename: `[id]${ext}`,
      }),
    ],
  }
};