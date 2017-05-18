import React from 'react';
import createClass from 'create-react-class';
import { CaretIcon, DropMenu } from '../../../index';

const { Control, Option } = DropMenu;

export default createClass({
	render() {
		return (
			<DropMenu>
				<Control>
					Colors<CaretIcon direction="down" />
				</Control>
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</DropMenu>
		);
	},
});
