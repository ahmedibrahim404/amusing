#!/usr/bin/env node

const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev');
const path = require('path');
var port = process.argv[2] ? (process.argv[2].split('=')[1] ? process.argv[2].split('=')[1] : 8080) : 8080;
const compiler = Webpack(webpackConfig({}, { mode:'development', port}));


const server = new WebpackDevServer(compiler, {
    contentBase: [ path.resolve(__dirname + `../../../public`) ],
    disableHostCheck: true,
    historyApiFallback: {
        index: 'index.html'
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    inline: true,
    watchOptions: {
      poll: true
    }
});


server.listen(port, 'localhost', () => {
  console.log(`Starting server on http://localhost:${port}`);
});
