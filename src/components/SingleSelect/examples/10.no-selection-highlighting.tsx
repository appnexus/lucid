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

// begin-hide-from-docs
export let notes = `
Use \`isSelectionHighlighted="false"\` when the dropdown defaults to null selections such as All or Any. The grey outline indicates that this selection does not need users' attention.
`;
// end-hide-from-docs
