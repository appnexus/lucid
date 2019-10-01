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

export const notes = `
Use this for cases where you don't want to allow users to reset once they have made a selection.
`;
