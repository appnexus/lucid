import React from 'react';
import createClass from 'create-react-class';
import { ProgressBar } from '../../../index';

export default createClass({
	render() {
		return (
			<ProgressBar percentComplete={75}>
				<ProgressBar.Title>This is a title</ProgressBar.Title>
			</ProgressBar>
		);
	},
});
