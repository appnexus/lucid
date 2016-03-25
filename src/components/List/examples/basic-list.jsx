import React from 'react';
import ListStateless from '../List';
import { buildStatefulComponent } from '../../../util/state-management';

const List = buildStatefulComponent(ListStateless);

export default React.createClass({
	render() {
		return (
			<List>
				<List.Item>one</List.Item>
				<List.Item>two</List.Item>
				<List.Item>three</List.Item>
			</List>
		);
	}
});
