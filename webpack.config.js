/* webpack.config.js */
const path = require('path');

const config = {
    entry: './src/main.ts',
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
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'output.bundle.js',
        path: path.resolve(__dirname, 'build')
    }
};
module.exports = config;