import React from 'react';
import createClass from 'create-react-class';
import { ProgressBar } from '../../../src/index.js';

export default createClass({
	getInitialState() {
		return {};
	},

	render() {
		return <ProgressBar title="Title" percentComplete={75} />;
	},
});
