import React from 'react';
import createClass from 'create-react-class';
import { Tabs } from '../../../index';

export default createClass({
	render() {
		const tabStyle = { width: '17%' };
		return (
			<div>
				<Tabs hasFullWidthTabs={false}>
					<Tabs.Tab style={tabStyle}>
						<Tabs.Title>One</Tabs.Title>
						One content
					</Tabs.Tab>
					<Tabs.Tab style={tabStyle}>
						<Tabs.Title>Two</Tabs.Title>
						Two content
					</Tabs.Tab>
					<Tabs.Tab style={tabStyle}>
						<Tabs.Title>Three</Tabs.Title>
						Three content
					</Tabs.Tab>
				</Tabs>
			</div>
		);
	},
});
