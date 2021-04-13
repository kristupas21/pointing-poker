/* eslint-disable import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */
const path = require('path');

function loadSassResources() {
  return (config) => {
    const sassResourcesLoader = {
      loader: require.resolve('sass-resources-loader'),
      options: {
        resources: path.join(process.cwd(), 'src/styles/shared.scss'),
      },
    };
    findRule(config, '/\\.(scss|sass)$/').use.push(sassResourcesLoader);
    findRule(config, '/\\.module\\.(scss|sass)$/').use.push(sassResourcesLoader);

    return config;
  };
}

function findRule(config, testPattern) {
  const matchesTestPattern = (rule) => String(rule.test) === testPattern;

  let result;

  config.module.rules.some((rule) => {
    if (matchesTestPattern(rule)) {
      result = rule;
      return true;
    }

    if (rule.oneOf) {
      result = rule.oneOf.find(matchesTestPattern);

      // Stop iteration once we found the rule
      if (result) return true;
    }

    return false;
  });

  if (!result) {
    throw new Error(`Unable to find a rule matching test pattern: ${testPattern}`);
  }

  return result;
}

module.exports = loadSassResources;
