import isChromatic from 'storybook-chromatic/isChromatic';

import '../src/index.less';

if (!isChromatic()) {
	require('./xandr-font-faces.less');
}

export const parameters = {
	options: {
		storySort: {
			order: ['Documentation', ['Introduction', 'Readme']],
		},
	},
};
