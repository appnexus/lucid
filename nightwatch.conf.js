const _ = require('lodash');
const browserstackConfig = require('./browserstack.conf.js');
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

	test_settings : _.mapValues(browserstackConfig, (config, env) => ({
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
