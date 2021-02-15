/* eslint-disable @typescript-eslint/no-var-requires */
const { override, disableEsLint } = require('customize-cra');
const loadSassResources = require('./scripts/loadSassResources');

function configureDevServer(configureProxy) {
  return (proxy, allowedHost) => {
    const config = {
      '/api': {
        target: `${process.env.API_URL}`,
        changeOrigin: true,
        secure: false,
      },
    };

    const proxyConfig = { ...proxy, ...config };

    return configureProxy(proxyConfig, allowedHost);
  };
}

module.exports = {
  devServer: configureDevServer,
  webpack: override(
    disableEsLint(),
    loadSassResources()
  ),
};
