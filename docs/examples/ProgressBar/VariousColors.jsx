import React from 'react';
import createClass from 'create-react-class';
import { ProgressBar } from '../../../src/index.js';

export default createClass({
	render() {
		return (
			<div>
				<p>Default</p>
				<ProgressBar kind="default" percentComplete={75} />
				<p>Success</p>
				<ProgressBar kind="success" percentComplete={75} />
				<p>Warning</p>
				<ProgressBar kind="warning" percentComplete={75} />
				<p>Danger</p>
				<ProgressBar kind="danger" percentComplete={75} />
				<p>Info</p>
				<ProgressBar kind="info" percentComplete={75} />
			</div>
		);
	},
});
