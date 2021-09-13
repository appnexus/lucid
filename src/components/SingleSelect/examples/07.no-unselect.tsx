import React from 'react';
import createClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	render() {
		return (
			<SingleSelect hasReset={false}>
				<Placeholder>Select Foo</Placeholder>
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</SingleSelect>
		);
	},
});

// begin-hide-from-docs
export let notes = `
This removes the default state, Select one, after a selection has been made. Use \`hasReset="false"\` to prevent users from deselecting a setting.
`;
// end-hide-from-docs
