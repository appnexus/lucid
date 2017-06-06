/*eslint no-console: 0*/
import { basename } from 'path';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { render } from 'react-dom';
import { withRouter, Switch } from 'react-router';
import { HashRouter, Link, Route } from 'react-router-dom';
import docgenMapRaw from './docgen.json'; // eslint-disable-line
import { handleHighlightCode, toMarkdown, sanitizeExamplePath } from './util';
import createClass from 'create-react-class';
import querystring from 'querystring';

import ColorPalette from './containers/color-palette';
import LandingPage from './containers/landing-page';
import Icons from './containers/icons';

import {
	Table,
	VerticalListMenuDumb,
	Autocomplete,
	stateManagement,
} from '../index';

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

const docgenMap = _.mapValues(docgenMapRaw, (value, componentName) => {
	// child components don't have any custom data
	if (_.includes(componentName, '.')) {
		return value;
	}

	const parentName = value.customData.extend;

	if (!parentName) {
		return value;
	}

	// TODO: this hack only allows for one level of `extend` nesting, we'll need
	// recursion to go deeper.
	const parentExtend = _.get(docgenMapRaw, `${parentName}.customData.extend`);
	const parentProps = _.get(
		docgenMapRaw,
		`${parentExtend || parentName}.props`
	);

	if (!parentProps) {
		throw new Error(
			`Looks like something is wrong with the custom metadata for ${componentName}. Please make sure the 'extend' refers to a real component that has valid props defined.`
		);
	}

	// The `clone` is important to keep from mutating `value`
	return _.defaultsDeep(_.clone(value), { props: parentProps });
});

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
		]).isRequired,
		/**
		 * Only provided when we're dealing with a `shape`
		 */
		shapeKey: string,
	},

	render() {
		const { componentName, type, shapeKey } = this.props;

		if (!type) {
			console.error(
				`It looks like there's an issue with ${componentName}'s props. One common cause of this issue is when the getDefaultProps method defines a default value for a prop that is not explicitly defined in the propTypes map.`
			);
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
						{type.name === 'arrayOf'
							? <PropType type={type.value} componentName={componentName} />
							: _.map(type.value, (innerType, key) => {
									return (
										<li key={key}>
											<PropType
												type={innerType}
												componentName={componentName}
												shapeKey={type.name === 'shape' ? key : null}
											/>
										</li>
									);
								})}
					</ul>
				</div>
			);
		}

		return (
			<span>
				{shapeKey ? `${shapeKey}: ` : null}{type.name || type.value || type}
			</span>
		);
	},
});

const Component = createClass({
	propTypes: {
		match: shape({
			params: shape({
				componentName: string.isRequired,
			}),
		}),
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
		const { componentName } = this.props.match.params;

		const component = _.get(docgenMap, componentName, {});
		const childComponents = _.map(
			_.get(component, 'childComponents', []),
			childComponent => {
				if (!childComponent.componentRef) {
					return childComponent;
				}
				return _.assign(
					{},
					childComponent,
					_.omit(_.get(docgenMap, childComponent.componentRef, {}), [
						'displayName',
					])
				);
			}
		);

		const componentProps = _.flow(
			x => _.get(x, `${componentName}.props`, []),
			x => _.toPairs(x), // this turns the object into an array of [propName, propDetails] so we can sort
			x => _.sortBy(x, x => x[0]) // sort by property name
		)(docgenMap);

		const descriptionMarkdown = _.get(
			docgenMap,
			`${componentName}.description`
		);

		if (!descriptionMarkdown) {
			throw new Error(
				`Unable to find ${componentName}'s description in src/docs/docgen.json. Are you on a bad URL? Did you forget to run \`gulp docs-generate\`? Did you remember to give ${componentName} a description block?`
			);
		}

		const descriptionHTML = toMarkdown(
			_.get(docgenMap, `${componentName}.description`)
		);

		const privateString = _.get(
			docgenMap,
			`${componentName}.isPrivateComponent`
		)
			? '(private)'
			: '';

		const componentNames = _.get(
			docgenMap,
			`${componentName}.customData.madeFrom`,
			[]
		);
		const composesComponents = _.isEmpty(componentNames)
			? null
			: <span className="Component-made-from">
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
				</span>;

		return (
			<div className="Component">
				<h2>{componentName} {privateString} {composesComponents}</h2>
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
								if (!propDetails || !propDetails.description) {
									console.error(
										`Warning: There was an issue with the docs that were generated for component "${componentName}" and prop "${propName}". One reason might be that you have a default value for something that was never declared in propTypes.`
									);
									return null;
								}

								return (
									<Tr key={propName}>
										<Td>{propName}</Td>
										<Td>
											<PropType
												type={propDetails.type}
												componentName={componentName}
											/>
										</Td>
										<Td>{propDetails.required ? 'yes' : 'no'}</Td>
										<Td>
											{propDetails.defaultValue
												? <pre>
														<code className="lang-javascript">
															{_.get(propDetails, 'defaultValue.value', '')}
														</code>
													</pre>
												: null}
										</Td>
										<Td
											dangerouslySetInnerHTML={toMarkdown(
												propDetails.description
											)}
										/>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</div>
				{!_.isEmpty(childComponents)
					? <section>
							<h3>Child Components</h3>
							{_.map(childComponents, childComponent => (
								<section key={childComponent.displayName}>
									<h4>
										{childComponent.componentRef
											? <Link
													to={`/components/${childComponent.componentRef.split('.')[0]}`}
												>
													{childComponent.displayName}
													{childComponent.displayName !==
														childComponent.componentRef &&
														` (${childComponent.componentRef})`}
												</Link>
											: childComponent.displayName}
									</h4>
									<div
										dangerouslySetInnerHTML={toMarkdown(
											childComponent.description
										)}
									/>
									{childComponent.propName &&
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
										</Table>}
									{!_.isNil(childComponent.props)
										? <Table style={{ width: '100%' }}>
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
															_.toPairs(_.get(childComponent, 'props', [])),
															x => x[0]
														),
														([propName, propDetails]) => {
															if (
																!propDetails || _.isNil(propDetails.description)
															) {
																console.error(
																	`Warning: There was an issue with the docs that were generated for component "${componentName}.${childComponent.displayName}" and prop "${propName}". One reason might be that you have a default value for something that was never declared in propTypes.`
																);
																return null;
															}

															return (
																<Tr
																	key={`${childComponent.displayName}-${propName}`}
																>
																	<Td>{propName}</Td>
																	<Td>
																		<PropType
																			type={propDetails.type}
																			componentName={childComponent.displayName}
																		/>
																	</Td>
																	<Td>{propDetails.required ? 'yes' : 'no'}</Td>
																	<Td>
																		{propDetails.defaultValue
																			? <pre>
																					<code className="lang-javascript">
																						{_.get(
																							propDetails,
																							'defaultValue.value',
																							''
																						)}
																					</code>
																				</pre>
																			: null}
																	</Td>
																	<Td
																		dangerouslySetInnerHTML={toMarkdown(
																			propDetails.description
																		)}
																	/>
																</Tr>
															);
														}
													)}
												</Tbody>
											</Table>
										: null}
								</section>
							))}
						</section>
					: null}
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
								{_.get(this.state.examples, `${componentName}.${example.name}`)
									? <pre>
											<code className="lang-javascript">{example.source}</code>
										</pre>
									: null}
								<example.Example />
							</li>
						);
					})}
				</ul>
			</div>
		);
	},
});

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

	renderCategoryLinks(items) {
		if (_.isPlainObject(items)) {
			const sortedItems = _.sortBy(_.toPairs(items), pair => pair[0]);

			return (
				<VerticalListMenu selectedIndices={[]}>
					{_.map(sortedItems, ([categoryName, kids]) => {
						return (
							<Item hasExpander isActionable={false} key={categoryName}>
								<span>{_.startCase(categoryName)}</span>
								{this.renderCategoryLinks(kids)}
							</Item>
						);
					})}
				</VerticalListMenu>
			);
		}

		return (
			<VerticalListMenu selectedIndices={[]}>
				{_.map(_.sortBy(items), componentName => {
					return (
						<Item
							key={componentName}
							onSelect={_.partial(
								this.goToPath,
								`/components/${componentName}`
							)}
							isSelected={
								this.props.location.pathname === `/components/${componentName}`
							}
						>
							{componentName}
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

		return _.flatMap(docgenMap, (value, componentName) => {
			if (!this.showPrivateComponents() && value.isPrivateComponent) {
				return [];
			}

			// exclude child components from search
			if (_.includes(componentName, '.')) {
				return [];
			}

			if (componentName.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
				return componentName;
			}

			return [];
		});
	},

	render() {
		const { search } = this.state;

		const docgenGroups = _.reduce(
			docgenMap,
			(acc, value, key) => {
				if (!this.showPrivateComponents() && value.isPrivateComponent) {
					return acc;
				}

				// exclude child components from grouping
				if (_.includes(key, '.')) {
					return acc;
				}

				const path = value.customData.categories.join('.');
				const newGroup = _.get(acc, path, []);
				newGroup.push(key);
				return _.set(acc, path, newGroup);
			},
			{}
		);
		const suggestions = this.searchResults();

		return (
			<div className="App">
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

						{this.renderCategoryLinks(docgenGroups)}
					</nav>
				</div>
				<div className="App-body">
					<Switch>
						<Route exact path="/" component={LandingPage} />
						<Route path="/components/:componentName" component={Component} />
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
						<Link to={`/test/${path}`}>
							{path}
						</Link>
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
