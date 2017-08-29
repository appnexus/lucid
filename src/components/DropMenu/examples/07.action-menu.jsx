import React from 'react';
import createReactClass from 'create-react-class';
import { CaretIcon, DropMenu } from '../../../index';

const { Control, Option } = DropMenu;

export default createReactClass({
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
