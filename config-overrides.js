/* eslint-disable @typescript-eslint/no-var-requires */
const { override, disableEsLint } = require('customize-cra');
const loadSassResources = require('./scripts/loadSassResources');

module.exports = {
  webpack: override(
    disableEsLint(),
    loadSassResources()
  ),
};
