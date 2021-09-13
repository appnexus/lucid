import React from 'react';
import createClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	render() {
		return (
			<SingleSelect>
				<Placeholder>Select Color</Placeholder>
				<Option isDisabled>Red</Option>
				<Option>Green</Option>
				<Option isDisabled>Blue</Option>
			</SingleSelect>
		);
	},
});

// begin-hide-from-docs
export let notes = `
Apply \`isDisabled\` to dropdown options that aren't currently available.
`;
// end-hide-from-docs
