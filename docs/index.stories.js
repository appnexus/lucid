import React from 'react';
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';
import marksy from 'marksy/components';
import { storiesOf } from '@storybook/react';
import LinkTo from '@storybook/addon-links/react';
import { withInfo } from '@storybook/addon-info';
import { exampleStory } from '../.storybook/lucid-docs-addon';
import { stripIndent } from '../.storybook/lucid-docs-addon/util';
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

import '../src/index.less';
import '../src/styles/master.less';
import './index.less'; // very minimal overrides

registerLanguage('jsx', jsx);

const articlePageOptions = { showAddonPanel: false };
const examplePageOptions = { showAddonPanel: true, addonPanelInRight: true };

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
		name: _.join(_.reject(_.words(key), w => /^(\d+)|jsx?$/.test(w)), ' '),
		Example: getDefaultExport(module),
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

storiesOf('Documentation', module)
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
	))
	.add('Readme', () => <ArticlePage>{compile(readmeText).tree}</ArticlePage>)
	.add('Child Components', () => (
		<ArticlePage>{compile(childComponentsText).tree}</ArticlePage>
	))
	.add('Hybrid State Components', () => (
		<ArticlePage>{compile(hybridComponentsText).tree}</ArticlePage>
	))
	.add('Computed Props', () => (
		<ArticlePage>{compile(computedPropsText).tree}</ArticlePage>
	))
	.add('Color Palette', () => (
		<ArticlePage>
			<ColorPalette />
		</ArticlePage>
	));

const loadedComponents = require('./load-components');

const filteredComponents = _.reject(loadedComponents, ({ component }) =>
	isPrivate(component)
);

// const storiesOfComponents = storiesOf('Components', module)
// 	.addParameters({ options: examplePageOptions })
// 	.add(
// 		'Overview',
// 		() => (
// 			<ArticlePage>
// 				<h1>Components</h1>
// 			</ArticlePage>
// 		),
// 		{ options: articlePageOptions, panelToggles: undefined }
// 	);

const storiesOfAddSequence = [];

_.forEach(
	filteredComponents,
	({ name: componentName, component, examplesContext, examplesContextRaw }) => {
		const examples = getExamplesFromContext(
			examplesContext,
			examplesContextRaw
		);

		const componentRef = getDefaultExport(component);
		// const otherComponentRef = require(component)[componentName];

		console.log(component);
		const notes =
			_.has(componentRef, 'peek.description') &&
			stripIndent(componentRef.peek.description);

		const category =
			_.has(componentRef, 'peek.categories') &&
			stripIndent(componentRef.peek.categories[0]);

		// TODO: Find a way to add per example notes
		_.forEach(examples, ({ name, Example, source }) => {
			storiesOfAddSequence.push([
				componentName,
				() => {
					storiesOf(`Components/${category}/${componentName}`, module)
						.addDecorator(withInfo)
						.addParameters({ options: examplePageOptions })
						.add(
							name,
							exampleStory({
								component,
								code: source,
								example: Example,
								path: [componentName],
							}),

							{
								notes: component.__docgenInfo,
								info: { inline: true, header: false, text: JSON.stringify(component.__docgenInfo) },
							}
						);
				},
			]);
		});
	}
);

_.forEach(_.sortBy(storiesOfAddSequence, _.property('0')), ([, addStory]) =>
	addStory()
);

const loadedIcons = require('./load-icons');

const filteredIcons = _.reject(loadedIcons, ({ component }) =>
	isPrivate(component)
);

const storiesOfIcons = storiesOf('Icons', module)
	.addParameters({ options: examplePageOptions })
	.add(
		'Overview',
		() => (
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
							color => {
								const Icon = _.head(filteredIcons).component;
								return (
									<div
										style={{
											padding: '5px',
											marginRight: '20px',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
										}}
									>
										<Icon size={32} color={color} isClickable />
										<div>{color}</div>
									</div>
								);
							}
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
								<LinkTo style={styles.link} kind='Icons' story={name}>
									{name}
								</LinkTo>
							</div>
						))}
					</div>
				</section>
			</ArticlePage>
		),
		{ options: articlePageOptions, panelToggles: undefined }
	);

_.forEach(
	filteredIcons,
	({ name, component, examplesContext, examplesContextRaw }) => {
		const examples = getExamplesFromContext(
			examplesContext,
			examplesContextRaw
		);
		const firstExample = _.first(examples);
		const FirstExampleComponent = firstExample.Example;
		storiesOfIcons.add(
			name,
			exampleStory({
				component,
				code: firstExample.source,
				example: FirstExampleComponent,
				path: [name],
			})
		);
	}
);
