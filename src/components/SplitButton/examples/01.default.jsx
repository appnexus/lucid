import React from 'react';
import createClass from 'create-react-class';
import { SplitButton } from '../../../index';

export default createClass({
	render() {
		return (
			<div style={{ height: 100 }}>
				<SplitButton style={{ marginRight: '20px' }}>
					<SplitButton.Button>Primary</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton kind="primary" style={{ marginRight: '20px' }}>
					<SplitButton.Button kind="primary">Primary</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton kind="success" style={{ marginRight: '20px' }}>
					<SplitButton.Button kind="success">Success</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton kind="warning" style={{ marginRight: '20px' }}>
					<SplitButton.Button>Warning</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton kind="danger" style={{ marginRight: '20px' }}>
					<SplitButton.Button kind="danger">Danger</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton kind="info" style={{ marginRight: '20px' }}>
					<SplitButton.Button kind="info">Info</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>
			</div>
		);
	},
});
