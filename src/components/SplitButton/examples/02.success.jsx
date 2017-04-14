import React from 'react';
import { SplitButton } from '../../../index';

export default React.createClass({
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
