import React from 'react';
import { TabsDumb as Tabs } from '../../../index';

export default React.createClass({
	render() {
		return (
			<Tabs>
				<Tabs.Tab Title='One'>One content</Tabs.Tab>
				<Tabs.Tab Title='Two' isDisabled={true}>Two content</Tabs.Tab>
				<Tabs.Tab Title='Three' isSelected={true}>Three Content</Tabs.Tab>
			</Tabs>
		);
	},
});
