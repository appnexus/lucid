import React from 'react';
import createClass from 'create-react-class';
import { SearchableSingleSelect } from '../../../index';

const { Option } = SearchableSingleSelect;

export default createClass({
	render() {
		return (
			<SearchableSingleSelect
				SearchField={{
					placeholder: 'Color',
				}}
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
