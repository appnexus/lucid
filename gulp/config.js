var SOURCE_DIR = 'src';
var BUILD_DIR = 'dist';
var BUILD_DIR_JSNEXT = 'dist-jsnext';

module.exports = {
	LESS_ENTRY: SOURCE_DIR + '/index.less',
	TEST_GLOB: {
		SOURCE: SOURCE_DIR + '/**/*.spec.js*',
		DEST: BUILD_DIR + '/**/*.spec.js*',
	},
	JS_GLOB: {
		SOURCE: SOURCE_DIR + '/**/*.js*',
		DEST: BUILD_DIR + '/**/*.js*',
	},
	EXAMPLES_GLOB: {
		SOURCE: SOURCE_DIR + '/**/examples/*.js*',
	},
	AUTOPREFIXER_BROWSERS: 'last 3 versions',
	SOURCE_DIR: SOURCE_DIR,
	BUILD_DIR: BUILD_DIR,
	BUILD_DIR_JSNEXT: BUILD_DIR_JSNEXT,
};
