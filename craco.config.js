const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/'),
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser.js'),
      };

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        }),

        // Thêm cái này để thay thế import sai
        new webpack.NormalModuleReplacementPlugin(
          /process\/browser$/,
          resource => {
            resource.request = resource.request + '.js';
          }
        )
      );

      return webpackConfig;
    },
  },
};
