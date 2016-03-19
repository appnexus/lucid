import React from 'react';
import SingleSelectStateless from '../SingleSelect';
import { buildStatefulComponent } from '../../../util/state-management';

const SingleSelect = buildStatefulComponent(SingleSelectStateless);
const {
	Placeholder,
	Option,
	OptionGroup
} = SingleSelect;

export default React.createClass({
	render() {
		return (
			<SingleSelect>
				<Placeholder>Select Color</Placeholder>

				<OptionGroup>
					Screen
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</OptionGroup>

				<OptionGroup>
					Print
					<Option>Cyan</Option>
					<Option>Yellow</Option>
					<Option>Magenta</Option>
					<Option>Black</Option>
				</OptionGroup>
			</SingleSelect>
		);
	}
});
