import React from 'react';
import createReactClass from 'create-react-class';
import { SplitButton } from '../../../index';

export default createReactClass({
	render() {
		return (
			<SplitButton kind="success" style={{ height: 100 }}>
				<SplitButton.Button kind="success">Save</SplitButton.Button>
				<SplitButton.Button>Action 01</SplitButton.Button>
				<SplitButton.Button>Here's Another Action</SplitButton.Button>
				<SplitButton.Button>And Another Action</SplitButton.Button>
			</SplitButton>
		);
	},
});
