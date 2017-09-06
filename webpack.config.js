const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const JSON5 = require('json5');

// TODO: Improve the function
function jsonToSass(json) {
  const variables = JSON5.parse(json);

  return Object.keys(variables)
    .map((key) => `$${key}: ${variables[key]};`)
    .join('\n');
}

module.exports = {
  entry: [
    './node_modules/normalize.css/normalize.css',
    './src/main.scss'
  ],
  output: {
    path: __dirname + '/build',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                data: jsonToSass(fs.readFileSync('./src/variables.json'))
              },
            },
            'postcss-loader'
          ],
        }),
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};
