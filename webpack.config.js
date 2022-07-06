const path = require( 'path' );
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { DefinePlugin } = require( 'webpack' );

const ENV_PATH = {
    'offline': path.join( __dirname, '.env.off' ),
    'test': path.join( __dirname, '.env.off' )
}

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    stats: {
        colors: true
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join( __dirname, 'dist' ),
        filename: '[name].js',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader' ,
                exclude: /node_modules/,
                options: { transpileOnly: true }
            },
            // fixed graphql errors
            { test: /\.mjs$/, include: /node_modules/, type: "javascript/auto" }
        ]
    },
    plugins: [
        new DefinePlugin( {
            'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV )
        } ),
        new Dotenv( {
            path: ENV_PATH[process.env.NODE_ENV]
        } ),
        new NodemonPlugin( {
            watch: path.join( __dirname, 'dist' ),
            ignore: [ "**/*.test.ts", ".git" ],
            ext: 'js',
            verbose: true
        } ),
    ],
    externals: [ nodeExternals() ]
};
