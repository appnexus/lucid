import React from 'react';
import createReactClass from 'create-react-class';
import { VerticalListMenu } from '../../../index';

export default createReactClass({
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
