import React from 'react';
import createClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	getInitialState() {
		return {
			selectedIndex: null,
		};
	},

	handleSelect(optionIndex: number | null) {
		this.setState({
			selectedIndex: optionIndex,
		});
	},

	render() {
		return (
			<section>
				<SingleSelect isInvisible onSelect={this.handleSelect}>
					<Placeholder>Select Color</Placeholder>
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</SingleSelect>

				<section style={{ marginTop: '10px' }}>
					Selected Index: {JSON.stringify(this.state.selectedIndex)}
				</section>
			</section>
		);
	},
});

// begin-hide-from-docs
export let notes = `
This removes the dropdown border. The lack of a border gives the dropdown a lighter visual weight within a data-intense layout.
`;
// end-hide-from-docs
