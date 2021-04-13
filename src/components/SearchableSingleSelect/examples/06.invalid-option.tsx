import React from 'react';
import createClass from 'create-react-class';
import { SearchableSingleSelect } from '../../../index';

const { Option } = SearchableSingleSelect;

export default createClass({
	getInitialState() {
		return {
			selectedIndex: null,
		};
	},

	handleSelect(optionIndex: number) {
		this.setState({
			selectedIndex: optionIndex,
		});
	},
	render() {
		return (
			<SearchableSingleSelect
				onSelect={this.handleSelect}
				Error={this.state.selectedIndex === 2 ? null : 'Please Choose Green'}
			>
				<Option Selected={<div style={{ color: 'red' }}>RED</div>}>Red</Option>
				<Option Selected={<div style={{ color: 'blue' }}>BLUE</div>}>
					Blue
				</Option>
				<Option Selected={<div style={{ color: 'green' }}>GREEN</div>}>
					Green
				</Option>
			</SearchableSingleSelect>
		);
	},
});
