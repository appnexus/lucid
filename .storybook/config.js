import { addParameters, configure } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';
import 'storybook-chromatic';

function loadStories() {
	require('../docs/index.stories.js');
}

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

configure(loadStories, module);
