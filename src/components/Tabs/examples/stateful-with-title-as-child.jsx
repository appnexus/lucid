import React from 'react';
import Tabs from '../Tabs';
import { buildStatefulComponent } from '../../../util/state-management';

var StatefulTabs = buildStatefulComponent(Tabs);

export default React.createClass({
	render() {
		return (
			<div>
				<StatefulTabs>
					<StatefulTabs.Tab>
						<StatefulTabs.Title>One</StatefulTabs.Title>
						One content
					</StatefulTabs.Tab>

					<StatefulTabs.Tab>
						<StatefulTabs.Title>Two</StatefulTabs.Title>
						Two content
					</StatefulTabs.Tab>

					<StatefulTabs.Tab>
						<StatefulTabs.Title>Three</StatefulTabs.Title>
						Three content
					</StatefulTabs.Tab>

					<StatefulTabs.Tab isDisabled={true}>
						<StatefulTabs.Title>Four</StatefulTabs.Title>
						Four content
					</StatefulTabs.Tab>
				</StatefulTabs>
			</div>
		);
	}
});
