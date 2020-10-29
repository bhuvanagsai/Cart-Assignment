const path = require( 'path' );
module.exports = {
    context: __dirname,
    entry: './public/scripts/index.js',
    output: {
        path: path.resolve( __dirname, 'build'),
        filename: 'main.js',
    },
    module: {
        rules :[{
            test : /\.js?$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        plugins: [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    },
                },
            ]
        }]

    },
    optimization: {
        concatenateModules: true,
        minimize: true,
    },
};