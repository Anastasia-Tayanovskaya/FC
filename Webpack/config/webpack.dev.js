const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const EVN = process.env.NODE_ENV = process.env.ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 9000;

module.exports = webpackMerge(commonConfig, {
	devServer: {
		port: PORT,
		host: HOST,
		watch: true
	},
	
	devtool: 'inline-source-map'
});