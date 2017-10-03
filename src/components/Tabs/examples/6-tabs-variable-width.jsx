import React from 'react';
import createClass from 'create-react-class';
import { Tabs } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<Tabs hasFullWidthTabs={false}>
					<Tabs.Tab width="17%">
						<Tabs.Title>One</Tabs.Title>
						One content
					</Tabs.Tab>
					<Tabs.Tab width="17%">
						<Tabs.Title>Two</Tabs.Title>
						Two content
					</Tabs.Tab>
					<Tabs.Tab width="17%">
						<Tabs.Title>Three</Tabs.Title>
						Three content
					</Tabs.Tab>
				</Tabs>
			</div>
		);
	},
});
