import React from 'react';
import { VerticalListMenu } from '../../../index';

export default React.createClass({
	render() {
		return (
			<VerticalListMenu style={{ width: 250 }}>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
			</VerticalListMenu>
		);
	}
});
