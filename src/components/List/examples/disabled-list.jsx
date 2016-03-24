import React from 'react';
import List from '../List';

export default React.createClass({
	render() {
		return (
			<List isDisabled>
				<List.Item>one</List.Item>
				<List.Item>two</List.Item>
				<List.Item>three</List.Item>
			</List>
		);
	}
});
