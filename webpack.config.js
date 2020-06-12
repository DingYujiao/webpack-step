const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html模板
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css 分离
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css压缩
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 打包前清除dist
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js插件


module.exports = {
	mode: 'none',
	context: __dirname,
	entry: path.resolve(__dirname , 'app.js'),
	output: {
		path: path.resolve(__dirname , './dist'),
		filename: '[name].[hash].js',
		publicPath: './'
	},
	
	module:{
		rules: [
			{ test: /\.txt$/, use: 'raw-loader' },
			{ test: /\.(less|css)$/, use: [
				MiniCssExtractPlugin.loader, // 因为分离了css，所以需要添加这个
				{
					loader: 'css-loader'
				},{
					loader: 'less-loader'
				},{
					loader:'postcss-loader',
					options: {
						env: 'development',
						config: {
						  ctx: {
							// cssnext: {...options},
							// cssnano: {...options},
							autoprefixer: {flexbox:true}
						  }
						}
					  }
				}
			] },
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
				  loader: 'babel-loader',
				  options: {
					presets: ['@babel/preset-env']
				  }
				}
			},
			{
				test: /\.md$/,
				use: [ 'json-loader', 'yaml-frontmatter-loader' ]
			 }
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new OptimizeCSSAssetsPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css',
			chunkFilename: 'css/[name].[hash].css',
		}),
			
	],
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		port: 9000
	}
}
