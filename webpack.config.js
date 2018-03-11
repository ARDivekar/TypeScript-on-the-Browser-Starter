/* webpack.config.js */
const path = require('path');

const config = {
    entry: {
        main : './src/main.ts',
        main2: './src/main2.ts'
    },
    devtool: 'inline-source-map',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                resource: {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                },
                use: 'awesome-typescript-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', 'json']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'build')
    }
};
module.exports = config;