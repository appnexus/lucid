import React from 'react';
import createClass from 'create-react-class';
import { DropMenu, Button } from '../../../index';

const { Control, Option } = DropMenu;

export default createClass({
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
