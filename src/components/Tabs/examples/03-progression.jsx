import React from 'react';
import createClass from 'create-react-class';
import { Tabs } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<Tabs isOpen={false} isProgressive={true}>
					<Tabs.Tab Title="One">One content</Tabs.Tab>
					<Tabs.Tab Title="Two">Two content</Tabs.Tab>
					<Tabs.Tab Title="Three">Three content</Tabs.Tab>
					<Tabs.Tab Title="Disabled" isDisabled={true}>
						Disabled Content
					</Tabs.Tab>
					<Tabs.Tab Title="Five" isDisabled={true}>Four content</Tabs.Tab>
				</Tabs>
			</div>
		);
	},
});
