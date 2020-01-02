import React from 'react';
import createClass from 'create-react-class';
import { SplitButton } from '../../../index';

export default createClass({
	render() {
		return (
			<div style={{ height: 100 }}>
				<SplitButton style={{ marginRight: '20px' }}>
					<SplitButton.Button>Basic</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton kind='primary' style={{ marginRight: '20px' }}>
					<SplitButton.Button>Primary</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>
			</div>
		);
	},
});
