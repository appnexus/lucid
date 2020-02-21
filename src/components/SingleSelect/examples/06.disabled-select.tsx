import React from 'react';
import createClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	render() {
		return (
			<SingleSelect isDisabled>
				<Placeholder>Select Color</Placeholder>
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</SingleSelect>
		);
	},
});

// begin-hide-from-docs
export const notes = `
Apply \`isDisabled\` to the dropdown if none of the options are currently available.
`;
// end-hide-from-docs
