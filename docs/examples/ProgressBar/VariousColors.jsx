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
				<ProgressBar kind="default" />
				<p>Success</p>
				<ProgressBar kind="success" />
				<p>Warning</p>
				<ProgressBar kind="warning" />
				<p>Danger</p>
				<ProgressBar kind="danger" />
				<p>Info</p>
				<ProgressBar kind="info" />
			</div>
		);
	},
});
