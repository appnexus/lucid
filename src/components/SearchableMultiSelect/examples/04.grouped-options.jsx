import React from 'react';
import createClass from 'create-react-class';
import { SearchableMultiSelect } from '../../../index';

const { Option, OptionGroup } = SearchableMultiSelect;

export default createClass({
	render() {
		return (
			<SearchableMultiSelect
				initialState={{
					selectedIndices: [0, 1, 2, 3, 11, 12, 48, 49],
				}}
			>
				<OptionGroup>
					Northeast
					<Option>Connecticut</Option>
					<Option>Delaware</Option>
					<Option>Maine</Option>
					<Option>Maryland</Option>
					<Option>Massachusetts</Option>
					<Option>New Hampshire</Option>
					<Option>New Jersey</Option>
					<Option>New York</Option>
					<Option>Pennsylvania</Option>
					<Option>Rhode Island</Option>
					<Option>Vermont</Option>
				</OptionGroup>
				<OptionGroup>
					Southeast
					<Option>Alabama</Option>
					<Option>Arkansas</Option>
					<Option>Florida</Option>
					<Option>Georgia</Option>
					<Option>Kentucky</Option>
					<Option>Louisiana</Option>
					<Option>Mississippi</Option>
					<Option>North Carolina</Option>
					<Option>South Carolina</Option>
					<Option>Tennessee</Option>
					<Option>Virginia</Option>
					<Option>West Virginia</Option>
				</OptionGroup>
				<OptionGroup>
					Midwest
					<Option>Illinois</Option>
					<Option>Indiana</Option>
					<Option>Iowa</Option>
					<Option>Kansas</Option>
					<Option>Michigan</Option>
					<Option>Minnesota</Option>
					<Option>Missouri</Option>
					<Option>Nebraska</Option>
					<Option>North Dakota</Option>
					<Option>Ohio</Option>
					<Option>South Dakota</Option>
					<Option>Wisconsin</Option>
				</OptionGroup>
				<OptionGroup>
					Southwest
					<Option>Arizona</Option>
					<Option>New Mexico</Option>
					<Option>Oklahoma</Option>
					<Option>Texas</Option>
				</OptionGroup>
				<OptionGroup>
					West
					<Option>California</Option>
					<Option>Colorado</Option>
					<Option>Idaho</Option>
					<Option>Montana</Option>
					<Option>Nevada</Option>
					<Option>Oregon</Option>
					<Option>Utah</Option>
					<Option>Washington</Option>
					<Option>Wyoming</Option>
				</OptionGroup>
				<Option>Alaska</Option>
				<Option>Hawaii</Option>
			</SearchableMultiSelect>
		);
	},
});
