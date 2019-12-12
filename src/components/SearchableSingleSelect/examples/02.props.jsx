import React from 'react';
import createClass from 'create-react-class';
import { SearchableSingleSelect } from '../../../index';

const { Option } = SearchableSingleSelect;

export default createClass({
	render() {
		return (
			<section>
				<h5>Loading</h5>
				<SearchableSingleSelect isLoading={true}>
					<Option>Alabama</Option>
				</SearchableSingleSelect>

				<h5>Disabled</h5>
				<SearchableSingleSelect isDisabled={true}>
					<Option>Alabama</Option>
				</SearchableSingleSelect>
			</section>
		);
	},
});
