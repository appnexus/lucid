// Allow webpack to handle less compilation here
require('./index.less');
require('../index.less');

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import docgenMap from './docgen.json';
import hljs from 'hljs';

// This is webpackism for "dynamically load all example files"
var reqExamples = require.context('../components/', true, /examples.*\.jsx?/i);
var reqExamplesRaw = require.context('!!raw!../components/', true, /examples.*\.jsx?/i);

var examplesByComponent = _.chain(reqExamples.keys())
	.map((path) => {
		var items = path.split('/').reverse(); // e.g. ['default.jsx', 'examples', 'Button', '.']
		var componentName = items[2];
		return {
			componentName: componentName,
			name: _.startCase(items[0].split('.')[0]),
			source: reqExamplesRaw(path),
			Example: reqExamples(path).default // `default` because we use es6 modules in the examples
		};
	})
	.groupBy('componentName')
	.value();

var docgenGroups = _.reduce(docgenMap, (acc, value, key) => {
	var path = value.customData.categories.join('.');
	var newGroup = _.get(acc, path, []);
	newGroup.push(key);
	return _.set(acc, path, newGroup);
}, {});

function handleHighlightCode() {
	_.each(document.querySelectorAll('pre code'), (block) => {
		hljs.highlightBlock(block);
	});
}

var {
	PropTypes: {
		oneOfType,
		object,
		array
		}
	} = React;

var Category = React.createClass({
	propTypes: {
		items: oneOfType([
			object,
			array
		])
	},

	componentDidMount: handleHighlightCode,
	componentDidUpdate: handleHighlightCode,

	renderPropType(type) {
		if (!type){
			return null;
		}
		// If type.value exists it means there are multiple children and we need to
		// recurse
		if (_.isPlainObject(type.value) || _.isArray(type.value)) {
			return (
				<div>
					{type.name === 'union' ? 'oneOfType' : type.name}:
					<ul>
						{_.map(type.value, (innerType, index) => {
							return <li key={index}>{this.renderPropType(innerType)}</li>
						})}
					</ul>
				</div>
			)
		}

		return <span>{type.name || type.value || type}</span>;
	},

	render() {
		var { items } = this.props;

		if (_.isPlainObject(items)) {
			return (
				<div className='Category'>
					<ul>
						{_.map(items, (value, key) => {
							return (
								<li key={key}>
									<h2>{_.startCase(key)}</h2>
									<Category items={value} />
								</li>
							)
						})}
					</ul>
				</div>
			);
		}

		return (
			<ul>
				{_.map(items, (item) => {
					return (
						<li key={item}>
							<h3>{item}</h3>
							<ul>
								<h3>Props</h3>
								<table className='Category-prop-table'>
									<thead>
										<tr>
											<th>Name</th>
											<th>Type</th>
											<th>Required</th>
											<th>Description</th>
										</tr>
									</thead>
									<tbody>
										{_.map(_.get(docgenMap, item + '.props', []), (propDetails, propName) => {
											return (
												<tr key={propName}>
													<td>{propName}</td>
													<td>{this.renderPropType(propDetails.type)}</td>
													<td>{String(propDetails.required)}</td>
													<td>{propDetails.description}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</ul>
							<ul>
								<h3>Examples</h3>
								{_.map(_.get(examplesByComponent, item, []), (example) => {
									return (
										<li key={example.name}>
											<h4>{example.name}</h4>
											<pre><code className="lang-javascript">{example.source}</code></pre>
											<example.Example />
										</li>
									);
								})}
							</ul>
						</li>
					);
				})}
			</ul>
		);
	}
});

var App = React.createClass({
	render() {
		return <Category items={docgenGroups} />;
	}
});

ReactDOM.render(<App />, document.querySelector('#docs'));
