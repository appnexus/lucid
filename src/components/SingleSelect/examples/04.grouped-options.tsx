import React from 'react';
import createClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option, OptionGroup } = SingleSelect;

export default createClass({
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

// begin-hide-from-docs
export let notes = `
This allows you to have sections within your dropdown. Use this to help frame users' understanding of the options.
`;
// end-hide-from-docs
