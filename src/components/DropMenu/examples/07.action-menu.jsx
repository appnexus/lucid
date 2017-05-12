import React from 'react';
import { CaretIcon, DropMenu } from '../../../index';

const { Control, Option } = DropMenu;

export default React.createClass({
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
