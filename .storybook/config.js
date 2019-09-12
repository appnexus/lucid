import { configure } from '@storybook/react';
import 'storybook-chromatic';

function loadStories() {
	require('../docs/index.stories.js');
}

configure(loadStories, module);
