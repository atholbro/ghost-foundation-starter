var webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || "development";
const production = nodeEnv === "production";

const conf = {
	entry: './src/assets/js/main.js',
	output: {
		path: path.resolve(__dirname, '../dist/assets/js/'),
		publicPath: "/assets/js/",
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules\/(?!foundation-sites\/).*/, // don't compile js under node_modules, except foundation

				options: {
					presets: ['env']
				}
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		}),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks:1
		})
	]
};

if (production) {
	conf.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			test: /\.js$/,
			compress: {
				warnings: false,
				comparisons: false
			}
		})
	);
}

module.exports = conf;
