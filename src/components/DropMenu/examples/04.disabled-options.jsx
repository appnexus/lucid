import React from 'react';
import { Button, DropMenu } from '../../../index';

const {
	Control,
	Option,
} = DropMenu;

export default React.createClass({
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
