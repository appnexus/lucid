import { addParameters, configure } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import 'storybook-chromatic';
import { getPropDefs } from './lucid-docs-addon/util';

function loadStories() {
	require('../docs/index.stories.js');
}

addParameters({
	options: {
		showNav: true,
		isToolshown: true,
	},
	docs: {
		container: DocsContainer,
		page: DocsPage,
		getPropDefs,
	},
});

configure(loadStories, module);
