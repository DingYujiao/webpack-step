const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html模板
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 分离
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩
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
			{ test: /\.txt$/, use: 'raw-loader' },
			{ test: /\.css$/, use: [
				MiniCssExtractPlugin.loader, // 因为分离了css，所以需要添加这个
				{
					loader: 'css-loader'
				}
			] }
		]
	},
	plugins: [
			new HtmlWebpackPlugin({
				template: './index.html',
				title: 'hhhhh'
			}),
			new OptimizeCSSAssetsPlugin(),
			new MiniCssExtractPlugin({
				filename: 'css/[name].[hash].css',
				chunkFilename: 'css/[name].[hash].css',
			})
	],
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 9000
	}
}
