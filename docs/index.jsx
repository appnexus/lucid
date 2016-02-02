
// Allow webpack to handle less compilation here
require('./index.less');
require('../src/index.less');

import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';

// This is webpackism for "dynamically load all example files"
var req = require.context('../src/', true, /examples.*\.jsx?/i);

var exampleComponents = _.map(req.keys(), (path) => {
	var items = path.split('/');
	return {
		componentName: items[1],
		name: items[3],
		module: req(path).default
	};
});

var App = React.createClass({
	render() {
		return (
			<ul>
				{_.map(exampleComponents, (obj) => {
					return (
						<li>
							{obj.componentName}
							{obj.name}
							<obj.module />
						</li>
					);
				})}
			</ul>
		);
	}
});

ReactDOM.render(<App />, document.querySelector('#docs'));
