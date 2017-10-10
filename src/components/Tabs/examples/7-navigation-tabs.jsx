import React from 'react';
import createClass from 'create-react-class';
import { Tabs } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<Tabs isNavigation={true}>
					<Tabs.Tab>
						<Tabs.Title>One</Tabs.Title>
						One content
					</Tabs.Tab>

					<Tabs.Tab>
						<Tabs.Title>Two</Tabs.Title>
						Two content
					</Tabs.Tab>

					<Tabs.Tab>
						<Tabs.Title>Three</Tabs.Title>
						Three content
					</Tabs.Tab>

				</Tabs>
			</div>
		);
	},
});
