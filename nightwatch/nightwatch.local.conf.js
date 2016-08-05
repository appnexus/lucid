const HOST = '127.0.0.1';
const PORT = 4444;

module.exports = {
	src_folders : ['tests'],
	exclude: ['tests/util.js'],
	output_folder : 'reports',
	custom_commands_path : '',
	custom_assertions_path : '',
	page_objects_path : '',
	globals_path : '',

	selenium : {
		start_process : false,
		host: HOST,
		port: PORT,
	},

	test_settings : {
		default : {
			selenium_host: HOST,
			selenium_port: PORT,
			desiredCapabilities: {
				build: 'nightwatch-browserstack',
				'browserstack.user': process.env.BROWSERSTACK_USERNAME,
				'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
				'browserstack.debug': true,
				'browserstack.local': true,
				browser: 'chrome',
			},
		},
	},
};
