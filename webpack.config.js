var webpack = require('webpack');
var path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

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
        }),
        new workboxPlugin({
            globDirectory: 'public/dist/javascripts',
            globPatterns: ['**/*.{html,js}'],
            swDest: path.join('public', 'serviceworker.js'),
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching: [
                {
                    urlPattern: new RegExp('http://localhost:3000'),
                    handler: 'staleWhileRevalidate'
                },
                {
                    urlPattern: new RegExp('http://foodmaniac.herokuapp.com'),
                    handler: 'staleWhileRevalidate'
                },
                {
                    urlPattern: new RegExp('https://foodmaniac.herokuapp.com'),
                    handler: 'staleWhileRevalidate'
                },
                {
                    urlPattern: new RegExp('https://maps.googleapis.com/maps/api'),
                    handler: 'staleWhileRevalidate'
                }
            ]
        })
    ]
}
module.exports = config;