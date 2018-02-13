var webpack = require('webpack');
var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var config = {
   	entry: './public/app/javascripts/index.js',
   	output: {
      	path: __dirname + '/public/dist/javascripts/',
	    filename: '[name]-bundle.js',
        publicPath: '/dist/javascripts/'
   	},
  	module: {
      	loaders: [
         	{
	            test: /\.jsx?$/,
	            exclude: /node_modules/,
	            loader: 'babel-loader',
	            query: {
	               	presets: ['es2015', 'react', 'stage-0']
	            }
         	}
      	]
   	},
   	plugins: [
      	new UglifyJSPlugin({
        	sourceMap: true
      	}),
     	new webpack.DefinePlugin({
       		'process.env.NODE_ENV': JSON.stringify('production')
    	}),
    	new webpack.optimize.CommonsChunkPlugin({
            name: 'node-static',
            filename: 'node-static.js',
            minChunks(module, count) {
                var context = module.context;
                return context && context.indexOf('node_modules') >= 0;
            }
        })
    ]
}
module.exports = config;