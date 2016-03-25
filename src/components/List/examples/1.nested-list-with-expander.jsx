import React from 'react';
import ListStateless from '../List';
import { buildStatefulComponent } from '../../../util/state-management';

const List = buildStatefulComponent(ListStateless);

export default React.createClass({
	render() {
		return (
			<List hasExpander >
				<List.Item>List Item</List.Item>

				<List.Item>
					List Item with Sublist

					<List.Item>Sublist Item</List.Item>

					<List.Item>
						Sublist Item with another List
						<List.Item>sub Sublist Item</List.Item>
						<List.Item>sub Sublist Item</List.Item>
						<List.Item>sub Sublist Item</List.Item>
					</List.Item>

					<List.Item>Sublist Item</List.Item>
				</List.Item>

				<List.Item>three</List.Item>
			</List>
		);
	}
});
