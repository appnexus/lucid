import { basename } from 'path';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { render } from 'react-dom';
import { withRouter, Switch } from 'react-router';
import { HashRouter, Link, Route } from 'react-router-dom';
import {
	handleHighlightCode,
	toMarkdown,
	sanitizeExamplePath,
	stripIndent,
} from './util';
import createClass from 'create-react-class';
import querystring from 'querystring';

import ColorPalette from './containers/color-palette';
import LandingPage from './containers/landing-page';
import Icons from './containers/icons';

import * as Lucid from '../index';

const { Table, VerticalListMenuDumb, Autocomplete, stateManagement } = Lucid;
const ignoreExports = [
	'componentTypes',
	'domHelpers',
	'redux',
	'stateManagement',
	'styleHelpers',
	'chartConstants',
	'formatters',
	'logger',
	'd3Scale',
	'd3Time',
];
const lucidComponents = _.omitBy(Lucid, (value, key) => {
	return _.includes(ignoreExports, key) || _.endsWith(key, 'Dumb');
});

// Allow webpack to handle less compilation here
require('./index.less');
require('../index.less');

const { Thead, Tbody, Tr, Th, Td } = Table;

function toggleOrSelectReducer(state = {}, i) {
	return {
		...state,
		expandedIndices: _.xor(state.expandedIndices || [], [i]),
	};
}

const VerticalListMenu = stateManagement.buildHybridComponent(
	VerticalListMenuDumb,
	{
		reducers: {
			onSelect: toggleOrSelectReducer,
			onToggle: toggleOrSelectReducer,
		},
	}
);

const { Item } = VerticalListMenu;

// This is webpackism for "dynamically load all example files"
const reqExamples = require.context(
	'../components/',
	true,
	/examples.*\.jsx?/i
);
const reqExamplesRaw = require.context(
	'!!raw!../components/',
	true,
	/examples.*\.jsx?/i
);

/**
 * Transforms an example filename to an example title. Remove leading numbers and
 * file extensions then capitalizes each word and separates each with a space.
 */
function getExampleTitleFromFilename(filename) {
	const words = _.words(_.startCase(basename(filename, '.jsx')));
	return (/^\d+$/.test(_.head(words)) ? _.tail(words) : words).join(' ');
}

const examplesByComponent = _.flow(
	x =>
		_.map(x, path => {
			const items = path.split('/').reverse(); // e.g. ['default.jsx', 'examples', 'Button', '.']
			const componentName = items[2];
			return {
				componentName: componentName,
				name: getExampleTitleFromFilename(items[0]),
				source: reqExamplesRaw(path),
				Example: reqExamples(path).default, // `default` because we use es6 modules in the examples
			};
		}),
	x => _.groupBy(x, 'componentName')
)(reqExamples.keys());

const { oneOfType, shape, object, array, string, node, any, bool } = PropTypes;

const PropType = createClass({
	propTypes: {
		componentName: string.isRequired,
		type: oneOfType([
			node,
			string,
			shape({
				name: string,
				computed: bool,
				value: oneOfType([string, array, object]),
			}),
		]),
		/**
		 * Only provided when we're dealing with a `shape`
		 */
		shapeKey: string,
	},

	render() {
		const { componentName, type, shapeKey } = this.props;

		if (!type) {
			return null;
		}

		// If type.value exists it means there are multiple children and we need to
		// recurse
		if (_.isPlainObject(type.value) || _.isArray(type.value)) {
			return (
				<div>
					{shapeKey ? `${shapeKey}: ` : null}
					{type.name === 'union' ? 'oneOfType' : type.name}:
					<ul>
						{type.name === 'arrayOf' ? (
							<PropType type={type.value} componentName={componentName} />
						) : (
							_.map(type.value, (innerType, key) => {
								return (
									<li key={key}>
										<PropType
											type={innerType}
											componentName={componentName}
											shapeKey={type.name === 'shape' ? key : null}
										/>
									</li>
								);
							})
						)}
					</ul>
				</div>
			);
		}

		return (
			<span>
				{shapeKey ? `${shapeKey}: ` : null}
				{type.name || type.value || type}
			</span>
		);
	},
});

const ContextualComponent = createClass({
	propTypes: {
		match: shape({
			params: shape({
				componentName: string.isRequired,
			}),
		}),
		location: any,
	},

	render() {
		const { componentName } = this.props.match.params;

		return (
			<Component
				componentName={componentName}
				componentRef={lucidComponents[componentName]}
				location={location}
			/>
		);
	},
});

const isReactComponent = value =>
	typeof value === 'function' &&
	value.prototype &&
	value.prototype.isReactComponent;

const Component = createClass({
	propTypes: {
		componentName: any,
		componentRef: any,
		location: any,
	},

	getInitialState() {
		return {
			examples: {
				Foo: {
					// an example of the shape of this state
					isShown: true,
				},
			},
		};
	},

	componentDidMount: handleHighlightCode,
	componentDidUpdate: handleHighlightCode,

	handleShowExample(componentName, exampleName) {
		const path = `${componentName}.${exampleName}`;
		const isShown = _.get(this.state.examples, path, false);
		this.setState({
			examples: _.set(this.state.examples, path, !isShown),
		});
	},

	render() {
		const { componentName, componentRef } = this.props;
		const childComponents = _.toPairs(_.pickBy(componentRef, isReactComponent));
		const defaultProps =
			componentRef.defaultProps || componentRef.peekDefaultProps;

		const componentProps = _.flow(
			x => _.get(x, 'propTypes', {}),
			x =>
				_.mapValues(x, (resolverFn, propName) => {
					const defaultProp = _.get(defaultProps, propName);
					const peek = _.get(resolverFn, 'peek', {});
					return _.assign({}, peek, {
						default: defaultProp,
					});
				}),
			x => _.toPairs(x), // this turns the object into an array of [propName, propDetails] so we can sort
			x => _.sortBy(x, x => x[0]) // sort by property name
		)(componentRef);

		const descriptionMarkdown = stripIndent(
			_.get(componentRef, 'peek.description', '')
		);

		const descriptionHTML = toMarkdown(descriptionMarkdown);

		const privateString = componentRef._isPrivate ? '(private)' : '';

		const componentNames = _.get(componentRef, 'peek.madeFrom', []);

		const composesComponents = _.isEmpty(componentNames) ? null : (
			<span className="Component-made-from">
				<span>made from: </span>
				{_.map(componentNames, (name, index) => (
					<span key={name}>
						<Link
							to={{
								pathname: `/components/${name}`,
								search: this.props.location.search,
							}}
						>
							{name}
						</Link>
						{index == componentNames.length - 1 ? null : ', '}
					</span>
				))}
			</span>
		);

		return (
			<div className="Component">
				<h2>
					{componentName} {privateString} {composesComponents}
				</h2>
				<div dangerouslySetInnerHTML={descriptionHTML} />
				<h3>Props</h3>
				<div className="Component-table-wrapper">
					<Table style={{ width: '100%' }}>
						<Thead>
							<Tr>
								<Th>Name</Th>
								<Th>Type</Th>
								<Th>Required</Th>
								<Th>Default</Th>
								<Th>Description</Th>
							</Tr>
						</Thead>
						<Tbody>
							{_.map(componentProps, ([propName, propDetails]) => {
								return (
									<Tr key={propName}>
										<Td>{propName}</Td>
										<Td>
											<PropType
												type={_.get(propDetails, 'type')}
												componentName={componentName}
											/>
										</Td>
										<Td>{propDetails.isRequired ? 'yes' : ''}</Td>
										<Td>
											{!_.isUndefined(propDetails.default) ? (
												<pre className="default-value">
													<code className="lang-javascript">
														{_.isFunction(propDetails.default)
															? 'func'
															: JSON.stringify(propDetails.default, null, 2)}
													</code>
												</pre>
											) : null}
										</Td>
										<Td
											dangerouslySetInnerHTML={toMarkdown(
												stripIndent(propDetails.text)
											)}
										/>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</div>
				{!_.isEmpty(childComponents) ? (
					<section>
						<h3>Child Components</h3>
						{_.map(childComponents, ([refName, childComponent]) => (
							<section key={refName}>
								<h4>
									{componentName !==
									_.first(
										_.get(childComponent, 'displayName', '').split('.')
									) ? (
										<Link
											to={`/components/${
												_.get(childComponent, 'displayName', '').split('.')[0]
											}`}
										>
											{refName}
											{refName !== childComponent.displayName &&
												` (${childComponent.displayName})`}
										</Link>
									) : (
										refName
									)}
								</h4>
								{_.has(childComponent, 'peek.description') ? (
									<div
										dangerouslySetInnerHTML={toMarkdown(
											stripIndent(_.get(childComponent, 'peek.description', ''))
										)}
									/>
								) : null}
								{childComponent.propName && (
									<Table>
										<Tbody>
											<Tr>
												<Td>propName</Td>
												<Td>
													<pre>
														<code className="lang-javascript">
															{childComponent.propName}
														</code>
													</pre>
												</Td>
											</Tr>
										</Tbody>
									</Table>
								)}
								{!_.isEmpty(childComponent.propTypes) ? (
									<Table style={{ width: '100%' }}>
										<Thead>
											<Tr>
												<Th>Name</Th>
												<Th>Type</Th>
												<Th>Required</Th>
												<Th>Default</Th>
												<Th>Description</Th>
											</Tr>
										</Thead>
										<Tbody>
											{_.map(
												_.sortBy(
													_.toPairs(_.get(childComponent, 'propTypes', {})),
													x => x[0]
												),
												([propName, propTypeResolver]) => {
													const defaultProps =
														childComponent.defaultProps ||
														childComponent.peekDefaultProps;
													const propDetails = _.assign(
														{},
														_.has(defaultProps, propName) && {
															default: _.get(defaultProps, propName),
														},
														_.get(propTypeResolver, 'peek')
													);

													return (
														<Tr key={`${refName}-${propName}`}>
															<Td>{propName}</Td>
															<Td>
																<PropType
																	type={propDetails.type}
																	componentName={childComponent.displayName}
																/>
															</Td>
															<Td>{propDetails.isRequired ? 'yes' : ''}</Td>
															<Td>
																{!_.isUndefined(propDetails.default) ? (
																	<pre className="default-value">
																		<code className="lang-javascript">
																			{_.isFunction(propDetails.default)
																				? 'func'
																				: JSON.stringify(
																						propDetails.default,
																						null,
																						2
																					)}
																		</code>
																	</pre>
																) : null}
															</Td>
															<Td
																dangerouslySetInnerHTML={toMarkdown(
																	stripIndent(propDetails.text)
																)}
															/>
														</Tr>
													);
												}
											)}
										</Tbody>
									</Table>
								) : null}
							</section>
						))}
					</section>
				) : null}
				<h3>Examples</h3>
				<ul className={`Component-examples ${componentName}`}>
					{_.map(_.get(examplesByComponent, componentName, []), example => {
						return (
							<li
								className={`${componentName}-example-${example.name}`}
								key={example.name}
							>
								<div className="Component-examples-header">
									<h4>{example.name}</h4>
									<a
										href="#"
										onClick={event => {
											event.preventDefault();
											this.handleShowExample(componentName, example.name);
										}}
									>
										{_.get(
											this.state.examples,
											`${componentName}.${example.name}`,
											false
										)
											? 'Hide code'
											: 'Show code'}
									</a>
								</div>
								{_.get(
									this.state.examples,
									`${componentName}.${example.name}`
								) ? (
									<pre>
										<code className="lang-javascript">{example.source}</code>
									</pre>
								) : null}
								<example.Example />
							</li>
						);
					})}
				</ul>
			</div>
		);
	},
});

const isPrivateComponent = componentRef =>
	_.get(componentRef, 'peek.isPrivate') || _.get(componentRef, '_isPrivate');

const App = createClass({
	getInitialState() {
		return {
			search: '',
		};
	},

	propTypes: {
		children: any,
		location: any,
		history: any,
	},

	goToPath(path) {
		this.props.history.push({
			pathname: path,
			search: this.props.location.search,
		});
	},

	renderCategoryLinks(categoryTree) {
		const sortedNodeKeys = _.sortBy(_.keys(categoryTree), _.lowerCase);

		return (
			<VerticalListMenu selectedIndices={[]}>
				{_.map(sortedNodeKeys, nodeKey => {
					const node = categoryTree[nodeKey];
					return isReactComponent(node) ? (
						<Item
							key={nodeKey}
							onSelect={_.partial(this.goToPath, `/components/${nodeKey}`)}
							isSelected={
								this.props.location.pathname === `/components/${nodeKey}`
							}
						>
							{_.startCase(nodeKey)}
						</Item>
					) : (
						<Item hasExpander isActionable={false} key={nodeKey}>
							<span>{_.startCase(nodeKey)}</span>
							{this.renderCategoryLinks(node)}
						</Item>
					);
				})}
			</VerticalListMenu>
		);
	},

	handleSearchChange(value) {
		this.setState({ search: value });
	},

	handleSearchSelect(index) {
		this.goToPath(`/components/${this.searchResults()[index]}`);
	},

	showPrivateComponents() {
		return _.includes(
			[true, '1', 'true'],
			querystring.parse(
				_.slice(_.get(this, 'props.location.search', ''), 1).join('')
			).private
		);
	},

	searchResults() {
		const { search } = this.state;
		const searchLower = _.toLower(search);
		const showPrivateComponents = this.showPrivateComponents();

		return _.filter(_.keys(lucidComponents), key => {
			const componentRef = lucidComponents[key];
			if (showPrivateComponents || !isPrivateComponent(componentRef)) {
				return _.includes(_.toLower(key), searchLower);
			}
		});
	},

	componentWillMount() {
		// Moved this out the render function for better performance
		this.categoryTree = _.reduce(
			lucidComponents,
			(acc, value, key) => {
				const categories = _.get(value, 'peek.categories', []);
				const path = categories.concat(key).join('.');
				if (this.showPrivateComponents() || !isPrivateComponent(value)) {
					return _.set(acc, path, value);
				}
				return acc;
			},
			{}
		);
	},

	render() {
		const { search } = this.state;

		const suggestions = this.searchResults();

		return (
			<div className="App">
				{/* `.App-loading` helps prevent a FOUC */}
				<div
					className="App-loading"
					style={{
						position: 'fixed',
						left: 0,
						top: 0,
						width: '100%',
						height: '100%',
						backgroundColor: 'white',
						zIndex: 2,
						pointerEvents: 'none',
						transition: 'opacity 200ms ease 200ms',
					}}
				/>
				<div className="App-sidebar">
					<Link
						className="App-sidebar-logo"
						to={{ pathname: '/', search: this.props.location.search }}
					>
						{/* `width` helps prevent a FOUC with webpack */}
						<img src="img/logo.svg" style={{ maxWidth: '100%' }} />
					</Link>

					<div className="App-sidebar-container">
						<Autocomplete
							className="App-sidebar-search"
							placeholder="Component search"
							suggestions={suggestions}
							value={search}
							onChange={this.handleSearchChange}
							onSelect={this.handleSearchSelect}
						/>
					</div>

					<nav>
						<VerticalListMenu className="App-pages">
							<Item
								onSelect={_.partial(this.goToPath, '/color-palette')}
								isSelected={this.props.location.pathname === '/color-palette'}
							>
								Color Palette
							</Item>
							<Item
								onSelect={_.partial(this.goToPath, '/icons')}
								isSelected={this.props.location.pathname === '/icons'}
							>
								Icons
							</Item>
						</VerticalListMenu>

						{this.renderCategoryLinks(this.categoryTree)}
					</nav>
				</div>
				<div className="App-body">
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route
							path="/components/:componentName"
							component={ContextualComponent}
						/>
						<Route path="/color-palette" component={ColorPalette} />
						<Route path="/icons" component={withRouter(Icons)} />
					</Switch>
				</div>
			</div>
		);
	},
});

const testExamplesMap = _.reduce(
	reqExamples.keys(),
	(acc, key) => {
		const exampleName = sanitizeExamplePath(key);
		return {
			...acc,
			[exampleName]: reqExamples(key).default,
		};
	},
	{}
);

const testExampleKeys = _.keys(testExamplesMap);

const TestList = createClass({
	render() {
		// gross hack to pass the list of examples to the screenshot test scaffold
		window.examples = testExampleKeys;
		return (
			<ul id="examples-list">
				{_.map(testExampleKeys, path => (
					<li key={path}>
						<Link to={`/test/${path}`}>{path}</Link>
					</li>
				))}
			</ul>
		);
	},
});

const Test = createClass({
	propTypes: { params: any },
	render() {
		const Example = testExamplesMap[this.props.params.exampleKey];
		return (
			<div id="example">
				<Example />
			</div>
		);
	},
});

render(
	<HashRouter>
		<div>
			<Route path="/" component={App} />
			<Route path="test" component={TestList} />
			<Route path="test/:exampleKey" component={Test} />
		</div>
	</HashRouter>,
	document.querySelector('#docs')
);
