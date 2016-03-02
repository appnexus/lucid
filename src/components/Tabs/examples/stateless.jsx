import React from 'react';
import Tabs from '../Tabs';

export default React.createClass({
	render() {
		return (
			<Tabs>
				<Tabs.Tab Title='One'>One content</Tabs.Tab>
				<Tabs.Tab Title='Two'>Two content</Tabs.Tab>
				<Tabs.Tab Title='Three'>Three Content</Tabs.Tab>
			</Tabs>
		);
	}
});
