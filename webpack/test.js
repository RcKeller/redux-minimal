var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        grumpywizards: './client/src/app.jsx'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{
                    loader: 'babel-loader'
                }],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style',
                    use: 'css?sourceMap!sass?sourceMap'
                })
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    output: {
        filename: 'public/[name].js'
    },
    sassLoader: {
        includePaths: [ 'client/style' ]
    },
    plugins: [
        new ExtractTextPlugin('public/grumpywizards.css')
    ]
};
