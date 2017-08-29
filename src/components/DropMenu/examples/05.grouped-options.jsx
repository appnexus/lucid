import React from 'react';
import createReactClass from 'create-react-class';
import { Button, DropMenu } from '../../../index';

const { Control, Option, OptionGroup } = DropMenu;

export default createReactClass({
	render() {
		return (
			<DropMenu>
				<Control>
					<Button>Select Color</Button>
				</Control>

				<OptionGroup>
					<Option>Select Color</Option>
				</OptionGroup>

				<OptionGroup>
					Screen
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</OptionGroup>

				<OptionGroup>
					Print
					<Option>Cyan</Option>
					<Option>Yellow</Option>
					<Option>Magenta</Option>
					<Option>Black</Option>
				</OptionGroup>
			</DropMenu>
		);
	},
});
