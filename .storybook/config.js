import { configure } from '@storybook/react';

function loadStories() {
	require('../docs/index.stories.js');
}

configure(loadStories, module);
