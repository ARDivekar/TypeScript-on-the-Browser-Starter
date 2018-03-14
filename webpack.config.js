/* webpack.config.js */
const path = require('path');

module.exports = function(env, argv){
    const config = {
        entry: {
            main: "./src/main.ts",
            main2: "./src/main2.ts",
            main3: "./src/main3.ts",
        },
        optimization:{
            splitChunks: {
                cacheGroups: {
                    AnimalLib: {
                        test: new RegExp('AnimalLib' + '\\' + path.sep + '([^' + '\\' + path.sep + ']+.ts)'),
                        chunks: "initial",
                        name: "AnimalLib",
                        enforce: true,
                    },
                    Mammals: {
                        test: new RegExp('AnimalLib' + '\\' + path.sep + 'Mammals' + '\\' + path.sep +   '.*.ts'),
                        chunks: "initial",
                        name: "AnimalLib-Mammals",
                        enforce: true,
                    },
                    Reptiles: {
                        test: new RegExp('AnimalLib' + '\\' + path.sep + 'Reptiles' + '\\' + path.sep +   '.*.ts'),
                        chunks: "initial",
                        name: "AnimalLib-Reptiles",
                        enforce: true,
                    },
                    Birds: {
                        test: new RegExp('AnimalLib' + '\\' + path.sep  + 'Birds' + '\\' + path.sep +  '.*.ts'),
                        chunks: "initial",
                        name: "AnimalLib-Birds",
                        enforce: true,
                    },
                    CompanyLib: {
                        test: new RegExp('CompanyLib' + '\\' + path.sep + '.*.ts'),
                        chunks: "initial",
                        name: "CompanyLib",
                        enforce: true
                    },
                    ProductLib: {
                        test: new RegExp('ProductLib' + '\\' + path.sep + '.*.ts'),
                        chunks: "initial",
                        name: "ProductLib",
                        enforce: true
                    },
                    jquery: {
                        test: new RegExp('node_modules' + '\\' + path.sep + 'jquery.*'),
                        chunks: "initial",
                        name: "jquery",
                        enforce: true
                    },
                    typescript_collections: {
                        test: new RegExp('node_modules' + '\\' + path.sep + 'typescript-collections.*'),
                        chunks: "initial",
                        name: "typescript_collections",
                        enforce: true
                    }
                }
            }
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
    if (env == undefined){
        throw "ERROR: No environment option specified!";
    }
    else if (env === 'dev' || env.dev === true || env === 'devo' || env.devo === true || env === 'development' || env.development === true){
        /* Development-specific config here. */
        config.devtool = 'inline-source-map';
        config.optimization.minimize = false;
        console.log("==================================================");
        console.log("Generating development-specific configuration.");
        console.log("==================================================");
    }
    else if (env === 'prod' || env.prod === true || env === 'production' || env.production === true) {
        /* Producion-specific config here. */
        console.log("==================================================");
        console.log("Generating production-specific configuration.");
        console.log("==================================================");
    }
    else {
        throw "ERROR: Invalid environment option specified!";
    }

    /* Extra command-line description that should be shown or hidden: */
    config.stats = {
        /* Stats for the entire build */
        env: true, 
        performance: true,
        timings: true,
        hash : true,
        warnings: false,
        colors: true,
        
        /* Chunk-specific stats: */
        chunks: true,
        chunksSort: "size",
        entrypoints: true,

        /* Module-specific stats: */
        modules: false,
        maxModules: 1000,
        depth: true,
        modulesSort: "depth",
        reasons : false,
        excludeModules: function(){return false;} /* Show all hidden modules. */
    };

    /* config.stats = "verbose"; */

    return config;
}