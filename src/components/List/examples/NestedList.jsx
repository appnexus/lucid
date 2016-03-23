import React from 'react';
import List from '../List';

export default React.createClass({
	render() {
		return (
			<List>
				<List.ListItem>subList One
					<List>
						<List.ListItem>one</List.ListItem>
						<List.ListItem>two</List.ListItem>
						<List.ListItem>three</List.ListItem>
					</List>
				</List.ListItem>
				<List.ListItem>cat</List.ListItem>
				<List.ListItem>dog</List.ListItem>
				<List.ListItem>sublist two
					<List>
						<List.ListItem>sub sublist one
							<List>
								<List.ListItem>one</List.ListItem>
								<List.ListItem>two</List.ListItem>
								<List.ListItem>three</List.ListItem>
							</List>
						</List.ListItem>
						<List.ListItem>two</List.ListItem>
						<List.ListItem>three</List.ListItem>
					</List>
				</List.ListItem>
				<List.ListItem>three</List.ListItem>
			</List>
		);
	}
});
