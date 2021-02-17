module.exports = {
	rootDir: 'src',
	preset: 'ts-jest/presets/js-with-ts',
	setupFilesAfterEnv: ['../tests/init', '../tests/enzyme-setup'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[tj]sx?$',
	collectCoverageFrom: [
		'components/**/*.{js,jsx}',
		'components/**/*.{ts,tsx}',
		'!components/**/examples/*',
		'util/**/*.{js,jsx}',
	],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	globals: {
		'ts-jest': {
			tsconfig: {
				module: 'commonjs',
				allowJs: true,
			},
		},
	},
};
