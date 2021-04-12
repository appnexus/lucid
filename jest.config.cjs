module.exports = {
	rootDir: 'src',
	setupFilesAfterEnv: ['../tests/init', '../tests/enzyme-setup'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[tj]sx?$',
	collectCoverageFrom: [
		'components/**/*.{js,jsx}',
		'components/**/*.{ts,tsx}',
		'!components/**/examples/**/*',
		'util/**/*.{js,jsx}',
	],
	snapshotSerializers: ['enzyme-to-json/serializer']
};
