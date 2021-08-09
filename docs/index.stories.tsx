import _ from 'lodash';
import { storiesOf } from '@storybook/react';
import { exampleStory } from '../.storybook/lucid-docs-addon';
import { stripIndent, formatSource } from '../.storybook/lucid-docs-addon/util';
import { registerLanguage } from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import isChromatic from 'storybook-chromatic/isChromatic';

import '../src/index.less';
import '../src/styles/master.less';

if (!isChromatic()) {
	require('./xandr-font-faces.less');
}

import './index.less'; // very minimal overrides

registerLanguage('jsx', jsx);

const examplePageOptions = { showPanel: true, panelPosition: 'right' };

const loadAllKeys = (reqContext, rawContext) => {
	return _.map(_.get(reqContext, 'keys', _.constant([]))(), (key) => ({
		key,
		module: reqContext(key),
		raw: rawContext(key),
	}));
};

const getDefaultExport = (module) => {
	if (module.__esModule) {
		return module.default;
	}
	return module;
};

const isPrivate = (component) =>
	component._isPrivate || (component.peek && component.peek.isPrivate);

const getExamplesFromContext = (reqExamples, rawContext) =>
	_.map(loadAllKeys(reqExamples, rawContext), ({ key, module, raw }) => ({
		name: _.join(
			_.reject(_.words(key), (w) => /^(\d+|[tj]sx?)$/.test(w)),
			' '
		),
		Example: getDefaultExport(module),
		exampleNotes: module.notes,
		source: raw,
	}));

const checkIconSVG = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg>
<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" preserveAspectRatio="xMidYMid meet" style="fill: rgb(42, 187, 176)">
	<path d="M11.92 5.19c.285.284.285.748 0 1.032l-4.932 4.98c-.285.286-.748.286-1.033 0L3.47 8.85c-.286-.287-.286-.748 0-1.034l.287-.343c.285-.286.747-.286 1.033 0l1.747 1.614 4.13-4.127c.284-.285.748-.285 1.033 0l.22.23z"></path>
</svg>
`;

const styles = {
	link: {
		color: '#587eba',
		textDecoration: 'underline',
		cursor: 'pointer',
		outline: 'none',
	},
	ul: {
		listStyleImage: `url('data:image/svg+xml;base64,${window.btoa(
			checkIconSVG
		)}')`,
	},
	li: {
		margin: '8px 0',
	},
};

const formatNotes = ({
	overview,
	intendedUse,
	technicalRecommendations,
	exampleNotes,
}) => `
### Overview

${overview}

---

### Intended Use

${intendedUse}

---

### Technical Recommendations

${technicalRecommendations}

${
	exampleNotes
		? `
---

### Example Notes

${exampleNotes}
`
		: ''
}
`;

const addStories = (
	components,
	separator = '/',
	categoryOverride: string | null = null
) => {
	const storiesOfAddSequence: any = [];

	_.forEach(
		components,
		({
			name: componentName,
			component,
			examplesContext,
			examplesContextRaw,
		}) => {
			const examples = getExamplesFromContext(
				examplesContext,
				examplesContextRaw
			);

			const componentRef = getDefaultExport(component);

			const notes =
				(_.has(componentRef, 'peek.notes') &&
					formatNotes(_.mapValues(componentRef.peek.notes, stripIndent))) ||
				(_.has(componentRef, 'peek.description') &&
					stripIndent(componentRef.peek.description));

			const category =
				categoryOverride ||
				(_.has(componentRef, 'peek.categories') &&
					stripIndent(componentRef.peek.categories[0]));

			_.forEach(examples, ({ name, Example, exampleNotes, source }) => {
				storiesOfAddSequence.push([
					componentName,
					() => {
						storiesOf(`${category}${separator}${componentName} (SB5)`, module)
							.addParameters({
								component,
								options: examplePageOptions,
								docs: { storyDescription: exampleNotes },
								mdxSource: formatSource(source),
								notes,
							})
							.add(
								name,
								exampleStory({
									component,
									code: source,
									example: Example,
									path: [componentName],
								})
							);
					},
				]);
			});
		}
	);

	_.forEach(_.sortBy(storiesOfAddSequence, _.property('0')), ([, addStory]) =>
		addStory()
	);
};

const loadedComponents = require('./load-components');

const filteredComponents = _.reject(loadedComponents, ({ component }) =>
	isPrivate(component)
);

addStories(filteredComponents);

const { default: loadedIcons } = require('./icons/load-icons');

const filteredIcons = _.reject(loadedIcons, ({ component }) =>
	isPrivate(component)
);

addStories(filteredIcons, '/', 'Icons/Icons');
