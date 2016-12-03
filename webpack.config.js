var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

var hashFiles = false
function addHash(template, hash) {
	return hashFiles ? template.replace(/\.[^.]+$/, '.[' + hash + ']$&') : template
}

function getCommonConfig() {
	return {
		entry: './src/index.ts',
		output: {
			path: path.resolve('./target'),
			filename: addHash('[name].js', 'chunkhash')
		},
		resolve: {
			root: [path.resolve('./src'), path.resolve('./static')],
			modulesDirectories: ['node_modules'],
			extensions: ['', '.ts', '.tsx', '.js'],
		},

		module: {
			loaders: [
				{
					test: /\.tsx?$/,
					include: path.resolve('./src'),
					loader: 'ts-loader'
				},
				{
					test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/,
					loader: addHash('file?name=[path][name].[ext]', 'hash:6')
				}
			]
		},

		plugins: [
			new webpack.NoErrorsPlugin(),
			new HtmlWebpackPlugin({
				filename: 'app.html',
				template: './static/app.html'
			})
		],

		ts: {
			transpileOnly: true,
			compilerOptions: {
				target: 'ES5',
				jsx: 'react',
				sourceMap: true
			}
		},

		postcss: function () {
			return [autoprefixer]
		}
	}
}

function addCssLoaders(config, devMode) {
	if (devMode) {
		config.module.loaders.push(
			{
				test: /\.css$/,
				loader: 'style!css!postcss'
			},
			{
				test: /\.less$/,
				loader: 'style!css!postcss!less'
			}
		)
	} else {
		config.module.loaders.push(
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('css!postcss')
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style', 'css!postcss!less', {publicPath: ''})
			}
		)
	}
}

function getDevelopmentConfig() {
	hashFiles = false
	var config = getCommonConfig()
	addCssLoaders(config, true)
	return config
}

module.exports = getDevelopmentConfig()