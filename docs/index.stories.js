import React from 'react';
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';
import marksy from 'marksy/components';
import { storiesOf } from '@storybook/react';
import LinkTo from '@storybook/addon-links/react';
import { exampleStory } from '../.storybook/lucid-docs-addon';
import { stripIndent, formatSource } from '../.storybook/lucid-docs-addon/util';
import readmeText from '!!raw-loader!../README.md';
import introText from '!!raw-loader!./intro.md';
import childComponentsText from '!!raw-loader!./child-components.md';
import hybridComponentsText from '!!raw-loader!./hybrid-components.md';
import computedPropsText from '!!raw-loader!./computed-props.md';
import LucidLogo from './LucidLogo';
import SyntaxHighlighter, {
	registerLanguage,
} from 'react-syntax-highlighter/prism-light';
import jsx from 'react-syntax-highlighter/languages/prism/jsx';
import okaidia from 'react-syntax-highlighter/styles/prism/okaidia';
import ColorPalette from './color-palette';
import isChromatic from 'storybook-chromatic/isChromatic';

import '../src/index.less';
import '../src/styles/master.less';

if (!isChromatic()) {
	require('./xandr-font-faces.less');
}

import './index.less'; // very minimal overrides

registerLanguage('jsx', jsx);

const articlePageOptions = { showPanel: false };
const examplePageOptions = { showPanel: true, panelPosition: 'right' };

const loadAllKeys = (reqContext, rawContext) => {
	return _.map(_.get(reqContext, 'keys', _.constant([]))(), key => ({
		key,
		module: reqContext(key),
		raw: rawContext(key),
	}));
};

const getDefaultExport = module => {
	if (module.__esModule) {
		return module.default;
	}
	return module;
};

const isPrivate = component =>
	component._isPrivate || (component.peek && component.peek.isPrivate);

const getExamplesFromContext = (reqExamples, rawContext) =>
	_.map(loadAllKeys(reqExamples, rawContext), ({ key, module, raw }) => ({
		name: _.join(_.reject(_.words(key), w => /^(\d+|[tj]sx?)$/.test(w)), ' '),
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

const compile = marksy({
	createElement: React.createElement,
	highlight: (language, code) =>
		ReactDOMServer.renderToStaticMarkup(
			<SyntaxHighlighter language={language || 'jsx'} style={okaidia}>
				{code}
			</SyntaxHighlighter>
		),
	elements: {
		a: props => <a {...props} style={styles.link} />,
		ul: props => <ul {...props} style={styles.ul} />,
		li: props => <li {...props} style={styles.li} />,
	},
	components: {
		LinkTo: props => <LinkTo {...props} style={styles.link} />,
	},
});

class ArticlePage extends React.Component {
	constructor(...args) {
		super(...args);
	}

	componentDidMount() {
		if (typeof window !== 'undefined') {
			window.document.documentElement.scrollTop = 0;
		}
	}

	render() {
		const { children } = this.props;

		return (
			<article
				style={{
					width: '100%',
					height: '100%',
				}}
			>
				<a href='https://github.com/appnexus/lucid'>
					<img
						style={{
							position: 'absolute',
							top: 0,
							right: 0,
							border: 0,
						}}
						src='//camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67'
						srcSet='//aral.github.io/fork-me-on-github-retina-ribbons/right-graphite@2x.png 2x'
						alt='Fork me on GitHub'
						data-canonical-src='//s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png'
					/>
				</a>
				{children}
			</article>
		);
	}
}

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

storiesOf('Documentation|Introduction', module)
	.addParameters({ options: articlePageOptions })
	.add('Introduction', () => (
		<ArticlePage>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<LucidLogo />
			</div>
			{compile(introText).tree}
		</ArticlePage>
	));

storiesOf('Documentation|Readme', module)
	.addParameters({ options: articlePageOptions })
	.add('Readme', () => <ArticlePage>{compile(readmeText).tree}</ArticlePage>);

storiesOf('Documentation|Child Components', module)
	.addParameters({ options: articlePageOptions })
	.add('Child Components', () => (
		<ArticlePage>{compile(childComponentsText).tree}</ArticlePage>
	));

storiesOf('Documentation|Hybrid State Components', module)
	.addParameters({ options: articlePageOptions })
	.add('Hybrid State Components', () => (
		<ArticlePage>{compile(hybridComponentsText).tree}</ArticlePage>
	));

storiesOf('Documentation|Computed Props', module)
	.addParameters({ options: articlePageOptions })
	.add('Computed Props', () => (
		<ArticlePage>{compile(computedPropsText).tree}</ArticlePage>
	));

storiesOf('Documentation|Color Palette', module)
	.addParameters({ options: articlePageOptions })
	.add('Color Palette', () => (
		<ArticlePage>
			<ColorPalette />
		</ArticlePage>
	));

const addStories = (components, separator, categoryOverride) => {
	const storiesOfAddSequence = [];

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
						storiesOf(`${category}${separator}${componentName}`, module)
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

addStories(filteredComponents, '|');

const loadedIcons = require('./load-icons');
const filteredIcons = _.reject(loadedIcons, ({ component }) =>
	isPrivate(component)
);

storiesOf('Icons', module)
	.addParameters({ options: articlePageOptions })
	.add('Overview', () => (
		<ArticlePage>
			<h1>Icons</h1>
			<section style={{ margin: '10px 0' }}>
				<h2>Color Variations</h2>
				<div
					style={{
						display: 'inline-flex',
						backgroundImage:
							'linear-gradient(45deg, #d3d1d1 25%, transparent 25%), linear-gradient(-45deg, #d3d1d1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d3d1d1 75%), linear-gradient(-45deg, transparent 75%, #d3d1d1 75%)',
						backgroundSize: '4px 4px',
						backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
					}}
				>
					{_.map(
						[
							'neutral-dark',
							'neutral-light',
							'primary',
							'white',
							'success',
							'warning',
							'secondary-one',
							'secondary-two',
							'secondary-three',
						],
						color => (
							<div
								style={{
									padding: '5px',
									marginRight: '20px',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<svg
									width='32'
									height='32'
									viewBox='0 0 36 36'
									preserveAspectRatio='xMidYMid meet'
									class={`lucid-Icon lucid-Icon-color-${color}`}
								>
									<circle cx='8.5' cy='5.5' r='5' />
									<path d='M35.5 35.5L21 11.5l-14.5 24zm-29 0h-6l11-18 2.934 4.801' />
									<path d='M16.399 19.102L18.5 21.5l3-3 3 3 2-1' />
								</svg>
								<div style={{ paddingTop: '3px' }}>{color}</div>
							</div>
						)
					)}
				</div>
			</section>
			<section style={{ margin: '10px 0' }}>
				<h2>Available Icons</h2>
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
					}}
				>
					{_.map(filteredIcons, ({ name, component: Icon }) => (
						<div
							key={name}
							style={{
								flexBasis: 256,
								margin: 10,
							}}
						>
							<Icon />{' '}
							<LinkTo style={styles.link} kind={`Icons|Icons/${name}`}>
								{name}
							</LinkTo>
						</div>
					))}
				</div>
			</section>
		</ArticlePage>
	));

addStories(filteredIcons, '/', 'Icons|Icons');
