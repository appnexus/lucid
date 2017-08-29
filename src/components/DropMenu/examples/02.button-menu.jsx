import React from 'react';
import createReactClass from 'create-react-class';
import { DropMenu, Button } from '../../../index';

const { Control, Option } = DropMenu;

export default createReactClass({
	render() {
		return (
			<DropMenu>
				<Control>
					<Button>Select Color</Button>
				</Control>
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</DropMenu>
		);
	},
});
