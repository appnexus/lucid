import React from 'react';
import { ProgressBar } from '../../../src/index.js';

export default class extends React.Component {
	render() {
		return (
			<div>
				<ProgressBar percentComplete="0" title="short title" />
				<ProgressBar percentComplete="25" title="Normal Title" />
				<ProgressBar percentComplete="50" title="ALL CAPS TITLE" />
				<ProgressBar
					percentComplete="75"
					title="This is an incredibly long title in comparison to the rest of the titles"
				/>
				<ProgressBar percentComplete="100" title="here's another title" />
			</div>
		);
	}
}
