import React from 'react';
import createClass from 'create-react-class';
import { ProgressBar } from '../../../src/index.js';

export default createClass({
	getInitialState() {
		return {};
	},

	render() {
		return (
			<div>
				<p>Default</p>
				<ProgressBar percentComplete="20" kind="default" />
				<p>Success</p>
				<ProgressBar percentComplete="40" kind="success" />
				<p>Warning</p>
				<ProgressBar percentComplete="60" kind="warning" />
				<p>Danger</p>
				<ProgressBar percentComplete="80" kind="danger" />
				<p>Info</p>
				<ProgressBar percentComplete="100" kind="info" />
			</div>
		);
	},
});
