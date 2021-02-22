import React from 'react';
import createClass from 'create-react-class';
import { Button, DropMenu } from '../../../index';

const { Control, Option } = DropMenu;

export default createClass({
	render() {
		return (
			<DropMenu isDisabled>
				<Control>
					<Button tabIndex={-1}>Select Color</Button>
				</Control>
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</DropMenu>
		);
	},
});
