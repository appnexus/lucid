var SOURCE_DIR = 'src';
var BUILD_DIR = 'dist';

module.exports = {
	LESS_ENTRY: SOURCE_DIR + '/index.less',
	TEST_GLOB: {
		SOURCE: SOURCE_DIR + '/**/*.spec.js*',
		DEST: BUILD_DIR + '/**/*.spec.js*'
	},
	JS_GLOB: {
		SOURCE: SOURCE_DIR + '/**/*.js*',
		DEST: BUILD_DIR + '/**/*.js*'
	},
	AUTOPREFIXER_BROWSERS: 'last 2 versions',
	SOURCE_DIR: SOURCE_DIR,
	BUILD_DIR: BUILD_DIR,
};
