import React from 'react';
import createClass from 'create-react-class';
import { Tabs } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<Tabs hasFullWidthTabs={false} isFloating>
					<Tabs.Tab count={12}>
						<Tabs.Title>One</Tabs.Title>
						One content
					</Tabs.Tab>
					<Tabs.Tab count={15}>
						<Tabs.Title>Two</Tabs.Title>
						Two content
					</Tabs.Tab>
					<Tabs.Tab count={7}>
						<Tabs.Title>Three</Tabs.Title>
						Three content
					</Tabs.Tab>
					<Tabs.Tab count={3} isDisabled>
						<Tabs.Title>Three</Tabs.Title>
						Three content
					</Tabs.Tab>
				</Tabs>
			</div>
		);
	},
});
