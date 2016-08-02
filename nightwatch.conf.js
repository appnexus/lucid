const _ = require('lodash');
const HOST = 'hub-cloud.browserstack.com';
const PORT = 80;

module.exports = {
	src_folders : ['tests'],
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

	test_settings : _.mapValues({
		bs_chrome: {
			base: 'BrowserStack',
			browser: 'chrome',
			browser_version: '51.0',
			os: 'OS X',
			os_version: 'El Capitan',
		},
		bs_firefox: {
			base: 'BrowserStack',
			browser: 'firefox',
			browser_version: '46.0',
			os: 'OS X',
			os_version: 'El Capitan',
		},
		bs_safari: {
			base: 'BrowserStack',
			browser: 'safari',
			os: 'OS X',
			os_version: 'El Capitan',
		},
		bs_ie: {
			base: 'BrowserStack',
			browser: 'internet explorer',
			os: 'Windows',
			os_version: '10',
		},
		bs_edge: {
			base: 'BrowserStack',
			browser: 'edge',
			os: 'Windows',
			os_version: '10',
		},
	}, (config, env) => ({
		selenium_host: HOST,
		selenium_port: PORT,
		desiredCapabilities: _.assign({}, config, {
			build: `nightwatch-browserstack-${env}`,
			'browserstack.user': process.env.BROWSERSTACK_USERNAME,
			'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
			'browserstack.debug': true,
			'browserstack.local': true,
			javascriptEnabled: true,
			acceptSslCerts: true,
		}),
	})),
};
