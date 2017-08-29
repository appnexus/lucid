import React from 'react';
import createReactClass from 'create-react-class';
import { Tabs } from '../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<Tabs>
					<Tabs.Tab Title="One">One content</Tabs.Tab>
					<Tabs.Tab Title="Two" isDisabled={true}>Two content</Tabs.Tab>
					<Tabs.Tab Title="Three">Three content</Tabs.Tab>
					<Tabs.Tab Title="Five">Four content</Tabs.Tab>
				</Tabs>
			</div>
		);
	},
});
