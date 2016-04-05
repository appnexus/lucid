import React from 'react';
import ListStateless from '../List';
import { buildStatefulComponent } from '../../../util/state-management';

const List = buildStatefulComponent(ListStateless);

export default React.createClass({
	render() {
		return (
			<List isDisabled={true} style={{ width: '200px' }}>
				<List.Item>Level one</List.Item>
				<List.Item>Level one</List.Item>
				<List.Item>Level one</List.Item>
			</List>
		);
	}
});
