import React from 'react';
import { Tabs } from '../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<Tabs>
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

					<Tabs.Tab isDisabled={true}>
						<Tabs.Title>Four</Tabs.Title>
						Four content
					</Tabs.Tab>
				</Tabs>
			</div>
		);
	}
});
