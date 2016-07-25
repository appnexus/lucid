// Karma configuration
// Generated on Thu Jul 21 2016 11:32:03 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
			'node_modules/react/dist/react-with-addons.js',
			'node_modules/react-dom/dist/react-dom.js',
      'src/test-entry.js',
    ],

    // list of files to exclude
    exclude: [
			'src/docs',
		],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/test-entry.js': ['webpack'],
    },

		webpack: {
			module: {
				noParse: [
					/node_modules\/sinon\//,
				],
				loaders: [{
					test: /\.jsx?$/,
					loader: 'babel',
					query: {
						cacheDirectory: true,
						presets: [ 'stage-2', 'es2015', 'react' ],
						plugins: ['babel-plugin-rewire'],
					},
					exclude: /(node_modules|src\/docs)/,
				}],
			},
			resolve: {
				extensions: ['', '.js', '.jsx'],
				alias: {
					'sinon': 'sinon/pkg/sinon',
				},
			},
			externals: {
				// enzyme deps incompatible with webpack
				// https://github.com/airbnb/enzyme/issues/47
				'jsdom': 'window',
				'cheerio': 'window',
				'react/lib/ExecutionEnvironment': true,
				'react/lib/ReactContext': 'window',
				// to avoid duplicate import of React with react-addons-css-transition-group
				'react': 'React',
				'react-dom': 'ReactDOM',
				'./React': 'React',
				'./ReactDOM': 'ReactDOM',
			},
			webpackMiddleware: {
				noInfo: true,
			},
		},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
}
