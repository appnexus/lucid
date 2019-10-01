import React from 'react';
import createClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	render() {
		return (
			<section style={{ minHeight: 90 }}>
				<SingleSelect isSelectionHighlighted={false}>
					<Placeholder>Select Foo</Placeholder>
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</SingleSelect>
			</section>
		);
	},
});

export const notes = `
Use this state for default or null selections such as All or Any.
`;
