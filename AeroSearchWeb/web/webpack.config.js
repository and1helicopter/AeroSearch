const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const bundleFolder = "../wwwroot/assets/";
//const bundleFolder = "./web/build/";
const srcFolder = "./src/";

const common = merge([
    {
        entry: {
            index: srcFolder + "index.jsx" 
        },
        output: {
            filename: "bundle.js",
            path: path.resolve(__dirname, bundleFolder)
        }
    }
]);

// module.exports = function(env) {
//     if (env === 'prod'){
//         return merge([
//             common,
//             // extractCSS(),
//             // uglifyJS()
//         ]);
//     }
//     if (env === 'dev'){
//         return merge([
//             common,
//             // devserver(),
//             // sass(),
//             // css()
//         ])
//     }
// };

module.exports = {
    entry: "./src/index.jsx", 
    devtool: "source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, bundleFolder)
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        watchContentBase: true,
        progress: true
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/,
                use: [
                "style-loader",
                {
                    loader: "css-loader",
                    options: {
                        modules: true
                    }
                }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    plugins: [
    ]
};