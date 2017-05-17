import React from 'react';
import createClass from 'create-react-class';
import { SingleSelectDumb as SingleSelect } from '../../../index';

const { Placeholder, Option, OptionGroup } = SingleSelect;

export default createClass({
	render() {
		return (
			<SingleSelect
				selectedIndex={1}
				DropMenu={{ focusedIndex: 2, isExpanded: true }}
			>
				<Placeholder>Select Color</Placeholder>

				<OptionGroup>
					Preferred
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</OptionGroup>

				<Option>Orange</Option>
				<Option isDisabled>Violet</Option>
				<Option isDisabled>Brown</Option>
			</SingleSelect>
		);
	},
});
