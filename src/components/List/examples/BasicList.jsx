import React from 'react';
import List from '../List';

export default React.createClass({
	render() {
		return (
			<List>
				<List.ListItem>one</List.ListItem>
				<List.ListItem>two</List.ListItem>
				<List.ListItem>three</List.ListItem>
			</List>
		);
	}
});
