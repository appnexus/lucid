import React from 'react';
import { ProgressBar } from '../../../src/index.js';

export default class extends React.Component {
	render() {
		return (
			<div>
				<ProgressBar percentComplete="0" />
				<ProgressBar percentComplete="25" />
				<ProgressBar percentComplete="50" />
				<ProgressBar percentComplete="75" />
				<ProgressBar percentComplete="100" />
			</div>
		);
	}
}
