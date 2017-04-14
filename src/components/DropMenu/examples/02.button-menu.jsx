import React from 'react';
import { DropMenu, Button } from '../../../index';

const { Control, Option } = DropMenu;

export default React.createClass({
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
