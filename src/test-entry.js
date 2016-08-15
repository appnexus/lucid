// creates a single test bundle
// https://github.com/webpack/karma-webpack#alternative-usage
var testsContext = require.context('.', true, /spec.jsx?$/);
testsContext.keys().forEach(testsContext);
