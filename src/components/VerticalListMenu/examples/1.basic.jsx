import React from 'react';
import createClass from 'create-react-class';
import { VerticalListMenu } from '../../../index';

export default createClass({
	render() {
		return (
			<VerticalListMenu style={{ width: 250 }}>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
			</VerticalListMenu>
		);
	},
});
