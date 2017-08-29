import React from 'react';
import createReactClass from 'create-react-class';
import { Button, DropMenu } from '../../../index';

const { Control, Option } = DropMenu;

export default createReactClass({
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
