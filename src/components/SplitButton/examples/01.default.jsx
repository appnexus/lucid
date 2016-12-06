import React from 'react';
import { SplitButton } from '../../../index';

export default React.createClass({
	render() {
		return (
			<div style={{height: 100}}>
				<SplitButton style={{marginRight: '20px'}}>
					<SplitButton.Button>Primary</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton style={{marginRight: '20px'}}>
					<SplitButton.Button kind='primary'>Primary</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton style={{marginRight: '20px'}}>
					<SplitButton.Button kind='link'>Link</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton style={{marginRight: '20px'}}>
					<SplitButton.Button kind='success'>Success</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton style={{marginRight: '20px'}}>
					<SplitButton.Button kind='warning'>Warning</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton style={{marginRight: '20px'}}>
					<SplitButton.Button kind='danger'>Danger</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>

				<SplitButton style={{marginRight: '20px'}}>
					<SplitButton.Button kind='info'>Info</SplitButton.Button>
					<SplitButton.Button>One</SplitButton.Button>
					<SplitButton.Button>Two</SplitButton.Button>
				</SplitButton>
			</div>
		);
	},
});
