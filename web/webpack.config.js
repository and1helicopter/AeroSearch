const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const common ={
    entry: [
        './src/index.tsx'
    ],
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            { test: /\.(ts|tsx)$/, loader: "awesome-typescript-loader"},
            { test: /\.js$/, use: ["source-map-loader"], enforce: "pre" },
            { test: /\.css$/, use: [                
                {loader: 'style-loader', },
                {loader: 'css-loader', },
            ]},
            { test: /\.svg$/, use: ['@svgr/webpack'] },     
            { test: /\.(png|jpg|gif)$/, use: ["file-loader"]},
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};

const productionConfig  = {
    mode: "production",
    output: {
        filename: "build.js",
        path: path.resolve(__dirname, './build/')
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                compress: true,
                warnings: false,
              },
        })],
    },
    plugins: [
    ]
};

const developmentConfig  = {
    mode: "development",
    devtool: 'source-map',
    devServer: {
        stats: 'errors-only',
        contentBase: './build/',
        compress: true,
        port: 9002,
        watchContentBase: true,
        progress: true,
        hot: true,
        inline: true, 
        open: true
    },
    plugins: [
        new BundleAnalyzerPlugin()  
    ]
};

module.exports = function(env ) {
    if (env  === 'prod') {
        return merge([            
            common,
            productionConfig
        ]);
    }
    if (env  === 'dev') {
        return merge([            
            common,
            developmentConfig
        ]);
    }
};