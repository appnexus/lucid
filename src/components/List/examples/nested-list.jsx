import React from 'react';
import ListStateless from '../List';
import { buildStatefulComponent } from '../../../util/state-management';

const List = buildStatefulComponent(ListStateless);

export default React.createClass({
	render() {
		return (
			<List>
				<List.Item>List Item</List.Item>
				<List.Item hasExpander >
					Another list with expander
					<List>
						<List.Item>One</List.Item>
						<List.Item>Two</List.Item>
					</List>
				</List.Item>
				<List.Item hasExpander >
					List Item with Sublist
					<List>
						<List.Item>Sublist Item</List.Item>
						<List.Item hasExpander >
							Sublist Item with another List
							<List>
								<List.Item>sub Sublist Item</List.Item>
								<List.Item>sub Sublist Item</List.Item>
								<List.Item>sub Sublist Item</List.Item>
							</List>
						</List.Item>
						<List.Item>Sublist Item</List.Item>
					</List>
				</List.Item>
				<List.Item>three</List.Item>
			</List>
		);
	}
});
