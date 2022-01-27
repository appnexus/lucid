import isChromatic from 'chromatic/isChromatic';

import '../src/styles/master.less';
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
