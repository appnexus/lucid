import React from 'react';
import createClass from 'create-react-class';
import { SplitButton } from '../../../index';

const style = { marginRight: '20px', height: 100 };

export default createClass({
	render() {
		return (
			<div>
				<SplitButton size="large" style={style}>
					<SplitButton.Button>Large</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>
				<SplitButton size="small" style={style}>
					<SplitButton.Button>Small</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>
				<SplitButton size="short" style={style}>
					<SplitButton.Button>Short</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>
			</div>
		);
	},
});
