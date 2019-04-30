import React from 'react';
import createClass from 'create-react-class';
import { Tabs } from '../../../index';

export default createClass({
	render() {
		const tabStyle = { width: '17%' };
		return (
			<div>
				<Tabs
					hasFullWidthTabs={false}
					isNavigation
					isOpen={false}
					isProgressive
				>
					<Tabs.Tab style={tabStyle} Title="One">
						One content
					</Tabs.Tab>
					<Tabs.Tab style={tabStyle} Title="Two">
						Two content
					</Tabs.Tab>
					<Tabs.Tab style={tabStyle} Title="Three">
						Three content
					</Tabs.Tab>
					<Tabs.Tab style={tabStyle} Title="Disabled" isDisabled={true}>
						Disabled Content
					</Tabs.Tab>
					<Tabs.Tab style={tabStyle} Title="Five" isDisabled={true}>
						Four content
					</Tabs.Tab>
				</Tabs>
			</div>
		);
	},
});
