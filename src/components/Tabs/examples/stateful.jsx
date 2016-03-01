import React from 'react';
import Tabs from '../Tabs';
import { buildStatefulComponent } from '../../../util/state-management';

var StatefulTabs = buildStatefulComponent(Tabs);

export default React.createClass({
	render() {
		return (
			<StatefulTabs>
				<StatefulTabs.Tab Title='One'>One content</StatefulTabs.Tab>
				<StatefulTabs.Tab Title='Two'>Two content</StatefulTabs.Tab>
				<StatefulTabs.Tab Title='Three'>Three content</StatefulTabs.Tab>
				<StatefulTabs.Tab Title='Four'>Four content</StatefulTabs.Tab>
			</StatefulTabs>
		);
	}
});
