import React from 'react';
import createReactClass from 'create-react-class';
import { VerticalTabs } from '../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<VerticalTabs>
					<VerticalTabs.Tab Title="One">One content</VerticalTabs.Tab>
					<VerticalTabs.Tab Title="Two">Two content</VerticalTabs.Tab>
					<VerticalTabs.Tab Title="Three">Three content</VerticalTabs.Tab>
					<VerticalTabs.Tab Title="Five">Four content</VerticalTabs.Tab>
				</VerticalTabs>
			</div>
		);
	},
});
