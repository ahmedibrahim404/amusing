

/*
    Created By: Ahmed Ibrahim
    Github: ahmedibrahim404
    Twitter: @ahmedie404
*/

const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');
const publicPath = "../../../";

module.exports = (_, options) => {
    var plugins;
    options.mode === undefined ? options.mode = 'development' : null;
    if(options.mode === 'production'){
        plugins = [
            new CopyWebpackPlugin([ { from: path.resolve(__dirname + `${publicPath}public`) , to: path.resolve(__dirname + `${publicPath}build/public`) , ignore: [ path.resolve(__dirname + `${publicPath}src`) ] } ], {})
        ]
    }
    return {
        plugins,
        mode:options.mode,
        devtool:"inline-source-map",
        entry: [
            'webpack-dev-server/client?http://localhost:'+options.port,
            path.resolve(__dirname + `${publicPath}src`) + "/main.js",
        ],
        output:{
            path: options.mode === "development" ? path.resolve(__dirname + `${publicPath}public`) : path.resolve(__dirname + `${publicPath}build/public`),
            filename:"bundle.js"
        },
        module:{
            rules: [
                {
                    loader:"babel-loader",
                    test:/\.js/
                },
                {
                    test:/\.s?css/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    exclude: /node_modules\//,
                    use: { loader: 'html-loader' }
                },
                {
                    test: /\.(jpg|png|svg|mp4)$/,
                    use: {
                      loader: "file-loader",
                    }
                },
            ]
        }    
    }
}