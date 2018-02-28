import { configure } from '@storybook/react';

const requireDotStoriesJs = require.context('../stories', true, /.stories.js$/);

function loadStories() {
	if (process.env.NODE_ENV === 'documentation') {
		require('../docs/index.stories.js');
	} else {
		requireDotStoriesJs
			.keys()
			.forEach(filename => requireDotStoriesJs(filename));
	}
}

configure(loadStories, module);
