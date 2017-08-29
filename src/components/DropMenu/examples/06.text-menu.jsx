import React from 'react';
import createReactClass from 'create-react-class';
import { DropMenu, TextField } from '../../../index';

const { Control, Option } = DropMenu;

export default createReactClass({
	render() {
		return (
			<DropMenu>
				<Control>
					<TextField placeholder="Text DropMenu" />
				</Control>
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</DropMenu>
		);
	},
});
