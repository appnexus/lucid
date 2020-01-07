import React from 'react';
import createClass from 'create-react-class';
import { SplitButton } from '../../../index';

const style = { marginRight: '20px', height: 100 };

export default createClass({
	render() {
		return (
			<div>
				<SplitButton style={style}>
					<SplitButton.Button>Basic</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton kind='primary' style={style}>
					<SplitButton.Button>Primary</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>
			</div>
		);
	},
});
