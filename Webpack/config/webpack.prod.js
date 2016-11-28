const webpackMerge = require('webpack-merge'); 
const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;

const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = webpackMerge(commonConfig, {
	devServer: {
		port: PORT,
		host: HOST,
		watch: true
	},
	
	devtool: 'source-map',
	plugins: [
		 new UglifyJsPlugin({
			beautify: false,
			output: {
				comments: false
			},
			compress: {
				warnings: false,
				conditionals: true,
				unused: true,
				comparisons: true,
				sequences: true,
				dead_code: true,
				evaluate: true,
				if_return: true,
				join_vars: true
			},
		}),
	]
});