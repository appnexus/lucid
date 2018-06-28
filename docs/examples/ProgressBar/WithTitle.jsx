import React from 'react';
import createClass from 'create-react-class';
import { ProgressBar } from '../../../src/index.js';

export default createClass({
	getInitialState() {
		return {};
	},

	render() {
		return <ProgressBar Title="Title" percentComplete={75} />;
	},
});
