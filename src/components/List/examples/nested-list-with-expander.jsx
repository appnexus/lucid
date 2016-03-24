import React from 'react';
import List from '../List';

export default React.createClass({
	render() {
		return (
			<List hasExpander>
				<List.Item>List Item</List.Item>
				<List.Item>
					List Item with Sublist
					<List.Item>Sublist Item</List.Item>
					<List.Item hasExpander={false}>
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
