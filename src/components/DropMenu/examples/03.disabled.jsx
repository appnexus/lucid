import React from 'react';
import { Button, DropMenu } from '../../../index';

const { Control, Option } = DropMenu;

export default React.createClass({
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
