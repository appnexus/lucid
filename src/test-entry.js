// creates a single test bundle
// https://github.com/webpack/karma-webpack#alternative-usage
const testsContext = require.context('.', true, /spec.jsx?$/);
testsContext.keys().forEach(testsContext);
