import React from 'react';
import createClass from 'create-react-class';
import { VerticalTabs } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<VerticalTabs>
					<VerticalTabs.Tab>
						<VerticalTabs.Title>One</VerticalTabs.Title>
						One content
					</VerticalTabs.Tab>

					<VerticalTabs.Tab>
						<VerticalTabs.Title>Two</VerticalTabs.Title>
						Two content
					</VerticalTabs.Tab>

					<VerticalTabs.Tab>
						<VerticalTabs.Title>Three</VerticalTabs.Title>
						Three content
					</VerticalTabs.Tab>

					<VerticalTabs.Tab>
						<VerticalTabs.Title>Four</VerticalTabs.Title>
						Four content
					</VerticalTabs.Tab>
				</VerticalTabs>
			</div>
		);
	},
});
