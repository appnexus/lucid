import React from 'react';
import List from '../List';

export default React.createClass({
	render() {
		return (
			<List isDisabled>
				<List.ListItem>one</List.ListItem>
				<List.ListItem>two</List.ListItem>
				<List.ListItem>three</List.ListItem>
			</List>
		);
	}
});
