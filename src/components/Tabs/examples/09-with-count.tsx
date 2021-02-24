import React from 'react';
import createClass from 'create-react-class';
import { Tabs } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<h4>Static Width</h4>
				<Tabs hasFullWidthTabs={false}>
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
						<Tabs.Title>Four</Tabs.Title>
						Four content
					</Tabs.Tab>
					<Tabs.Tab count={0} isDisabled>
						<Tabs.Title>Five</Tabs.Title>
						Five content
					</Tabs.Tab>
				</Tabs>

				<h4>Variable Width</h4>
				<Tabs hasFullWidthTabs={false}>
					<Tabs.Tab count={1231321} isVariableCountWidth={true}>
						<Tabs.Title>One</Tabs.Title>
						One content
					</Tabs.Tab>
					<Tabs.Tab count={6546541612} isVariableCountWidth={true}>
						<Tabs.Title>Two</Tabs.Title>
						Two content
					</Tabs.Tab>
					<Tabs.Tab count={7} isVariableCountWidth={true}>
						<Tabs.Title>Three</Tabs.Title>
						Three content
					</Tabs.Tab>
					<Tabs.Tab count={123} isDisabled isVariableCountWidth={true}>
						<Tabs.Title>Four</Tabs.Title>
						Four content
					</Tabs.Tab>
				</Tabs>
			</div>
		);
	},
});
