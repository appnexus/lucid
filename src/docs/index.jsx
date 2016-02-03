// Allow webpack to handle less compilation here
require('./index.less');
require('../index.less');

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import docgenMap from './docgen.json';

// This is webpackism for "dynamically load all example files"
var reqExamples = require.context('../components/', true, /examples.*\.jsx?/i);
var reqExamplesRaw = require.context('!!raw!../components/', true, /examples.*\.jsx?/i);

var groupedExamples = _.chain(reqExamples.keys())
	.map((path) => {
		var items = path.split('/').reverse(); // e.g. ['default.jsx', 'examples', 'Button', '.']
		var componentName = items[2];
		return {
			docs: _.get(docgenMap, componentName),
			componentName: componentName,
			exampleName: _.startCase(items[0].split('.')[0]),
			exampleSource: reqExamplesRaw(path),
			Example: reqExamples(path).default // `default` because we use es6 modules in the examples
		};
	})
	.groupBy('componentName')
	.value();

var App = React.createClass({
	render() {
		return (
			<ul>
				{_.map(groupedExamples, (examples, groupName) => {
					return (
						<ul key={groupName}>
							<h2>{groupName}</h2>
							{_.map(examples, ({exampleName, exampleSource, Example, docs}) => {
								return (
									<li key={exampleName}>
										<h3>{exampleName}</h3>
										<p>Description: {docs.description}</p>
										<p>Categories: {docs.customData.categories.join(', ')}</p>
										<pre><code>{exampleSource}</code></pre>
										<Example/>
									</li>
								)
							})}
						</ul>
					);
				})}
			</ul>
		);
	}
});

ReactDOM.render(<App />, document.querySelector('#docs'));

