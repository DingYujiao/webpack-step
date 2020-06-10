const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

module.exports = {
	mode: 'none',
	context: __dirname,
	entry: path.resolve(__dirname , 'app.js'),
	output: {
		path: path.resolve(__dirname , './dist'),
		filename: 'output.js'
	},
	module:{
		rules: [
			{ test: /\.txt$/, use: 'raw-loader' }
		]
	},
	plugins: [
			new HtmlWebpackPlugin({
				template: './index.html'
			})
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	}
}
