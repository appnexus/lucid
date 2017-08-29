import React from 'react';
import createReactClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createReactClass({
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
