import React from 'react';
import createClass from 'create-react-class';
import { Tabs } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<Tabs>
					<Tabs.Tab Title='One' className='one'>
						One content
					</Tabs.Tab>
					<Tabs.Tab Title='Two' isDisabled={true}>
						Two content
					</Tabs.Tab>
					<Tabs.Tab Title='Three'>Three content</Tabs.Tab>
					<Tabs.Tab Title='Four'>Four content</Tabs.Tab>
				</Tabs>
			</div>
		);
	},
});
