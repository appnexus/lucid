import React from 'react';
import createClass from 'create-react-class';
import { SplitButton } from '../../../index';

export default createClass({
	render() {
		return (
			<SplitButton direction="up" kind="primary" style={{ height: 100 }}>
				<SplitButton.Button kind="primary">Save</SplitButton.Button>
				<SplitButton.Button>Action 01</SplitButton.Button>
				<SplitButton.Button>Here's Another Action</SplitButton.Button>
				<SplitButton.Button>And Another Action</SplitButton.Button>
			</SplitButton>
		);
	},
});
