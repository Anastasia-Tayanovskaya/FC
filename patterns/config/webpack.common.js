const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: ['whatwg-fetch', './src/app.js'],
	output: {
		path: './dist',
		filename: 'app.bundle.js'
	},
	resolveLoader: {
		alias: {
			'json-custom-loader': path.join(__dirname, '/../loader/json-custom-loader')
		}
	},
	resolve: {
		extensions: ['', '.js', '.styl', '.json']
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{ 
			test: /\.styl$/, 
			exclude: /node_modules/,
			//loader: 'style-loader!css-loader!stylus-loader' 
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader')
		},
		{
			test: /\.png$/,
			loader: 'url?limit=15000'
		},
		{
			test: /\.json$/,
			loader: 'json-custom-loader'
		}]
	},
	
	plugins: [
        new ExtractTextPlugin('app.css')
    ]
 };