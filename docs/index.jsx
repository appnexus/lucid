
// Allow webpack to handle less compilation here
require('./index.less');
require('../src/index.less');

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

// This is webpackism for "dynamically load all example files"
var req = require.context('../src/', true, /examples.*\.jsx?/i);

var groupedComponents = _.chain(req.keys())
	.map((path) => {
		var items = path.split('/');
		return {
			componentName: items[1],
			name: items[3],
			module: req(path).default // `default` because we use es6 modules in the examples
		};
	})
	.groupBy('componentName')
	.value();

var App = React.createClass({
	render() {
		return (
			<ul>
				{_.map(groupedComponents, (components, groupName) => {
					return (
						<ul key={groupName}>
							<h2>{groupName}</h2>
							{_.map(components, (componentObj) => {
								return (
									<li key={componentObj.name}>
										<h3>{componentObj.name}</h3>
										<componentObj.module/>
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
