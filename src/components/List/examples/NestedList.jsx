import React from 'react';
import List from '../List';

export default React.createClass({
	render() {
		return (
			<List>
				<List.ListItem>List Item</List.ListItem>
				<List.ListItem>List Item with Sublist
					<List>
						<List.ListItem>Sublist Item</List.ListItem>
						<List.ListItem>Sublist Item with another List
							<List>
								<List.ListItem>sub Sublist Item</List.ListItem>
								<List.ListItem>sub Sublist Item</List.ListItem>
								<List.ListItem>sub Sublist Item</List.ListItem>
							</List>
						</List.ListItem>
						<List.ListItem>Sublist Item</List.ListItem>
					</List>
				</List.ListItem>
				<List.ListItem>three</List.ListItem>
			</List>
		);
	}
});
