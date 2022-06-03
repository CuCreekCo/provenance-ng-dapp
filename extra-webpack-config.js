const webpack = require('webpack');

module.exports = {
	plugins: [
		// Work around for Buffer is undefined:
		// https://github.com/webpack/changelog-v5/issues/10
		new webpack.ProvidePlugin({
			Buffer: ['buffer', 'Buffer'],
		}),
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
		fallback: {
			crypto: require.resolve('crypto-browserify'),
			buffer: require.resolve("buffer"),
			util: require.resolve("util"),
			stream: require.resolve("stream-browserify"),
			process: require.resolve("process")
		},
	},
	node: {
		global: true,
		__filename: true,
		__dirname: true,
	}
};
