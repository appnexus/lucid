import React from 'react';
import { ProgressBar } from '../../../src/index.js';

export default class extends React.Component {
	render() {
		return (
			<div>
				<ProgressBar percentComplete="25" hasLabel="true" />
				<ProgressBar percentComplete="50" hasLabel="true" />
				<ProgressBar percentComplete="75" hasLabel="true" />
				<ProgressBar percentComplete="100" hasLabel="true" />
			</div>
		);
	}
}
