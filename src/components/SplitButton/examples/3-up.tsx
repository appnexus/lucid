import React from 'react';
import createClass from 'create-react-class';
import { SplitButton } from '../../../index';

export default createClass({
	render() {
		return (
			<div style={{ height: 100 }}>
				<SplitButton direction='up' kind='primary'>
					<SplitButton.Button>Save</SplitButton.Button>
					<SplitButton.Button>Action 01</SplitButton.Button>
					<SplitButton.Button>Here's Another Action</SplitButton.Button>
					<SplitButton.Button>And Another Action</SplitButton.Button>
				</SplitButton>
			</div>
		);
	},
});
