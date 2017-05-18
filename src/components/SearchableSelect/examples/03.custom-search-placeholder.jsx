import React from 'react';
import createClass from 'create-react-class';
import { SearchableSelect } from '../../../index';

const { Placeholder, Option, SearchField } = SearchableSelect;

export default createClass({
	getInitialState() {
		return {
			selectedIndex: null,
		};
	},

	handleSelect(optionIndex) {
		this.setState({
			selectedIndex: optionIndex,
		});
	},

	render() {
		return (
			<section style={{ marginBottom: '20px' }}>
				<SearchableSelect onSelect={this.handleSelect} maxMenuHeight="200">
					<SearchField placeholder="Type here to filter..." />
					<Placeholder>Select Color</Placeholder>
					<Option>Blue</Option>
					<Option>Green</Option>
					<Option>Orange</Option>
					<Option>Red</Option>
				</SearchableSelect>
			</section>
		);
	},
});
