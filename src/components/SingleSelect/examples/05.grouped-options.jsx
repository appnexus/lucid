import React from 'react';
import createReactClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option, OptionGroup } = SingleSelect;

export default createReactClass({
	render() {
		return (
			<SingleSelect>
				<Placeholder>Select Color</Placeholder>

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
			</SingleSelect>
		);
	},
});
