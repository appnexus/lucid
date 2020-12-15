import React from 'react';
import createClass from 'create-react-class';
import { SearchableSingleSelect } from '../../../index';

const { Option, OptionGroup } = SearchableSingleSelect;

const OptionCols = ({ col1, col2 }: { col1: string; col2: string }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ width: 100 }}>{col1}</div>
		<div>{col2}</div>
	</div>
);

export default createClass({
	render() {
		return (
			<SearchableSingleSelect
				SearchField={{
					placeholder: 'Character',
				}}
			>
				<OptionGroup>
					<OptionCols col1='NAME' col2='NUMBER'  />

					<Option Selected='Drone (13)'>
						<OptionCols col1='Drone' col2='13' />
					</Option>

					<Option Selected='Appa (14)'>
						<OptionCols col1='Appa' col2='14' />
					</Option>

					<Option Selected='Breakfast (15)'>
						<OptionCols col1='Breakfast' col2='15' />
					</Option>

					<Option Selected='Scout (16)'>
						<OptionCols col1='Scout' col2='16' />
					</Option>
				</OptionGroup>
			</SearchableSingleSelect>
		);
	},
});
