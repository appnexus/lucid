import React from 'react';
import createClass from 'create-react-class';
import { Button, DropMenu } from '../../../index';

const { Control, Option } = DropMenu;

export default createClass({
	render() {
		return (
			<DropMenu>
				<Control>
					<Button>Select Color</Button>
				</Control>
				<Option isDisabled>Red</Option>
				<Option>Green</Option>
				<Option isDisabled>Blue</Option>
			</DropMenu>
		);
	},
});
