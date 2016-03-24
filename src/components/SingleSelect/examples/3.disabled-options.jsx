import React from 'react';
import SingleSelectStateless from '../SingleSelect';
import { buildStatefulComponent } from '../../../util/state-management';

const SingleSelect = buildStatefulComponent(SingleSelectStateless);
const {
	Placeholder,
	Option
} = SingleSelect;

export default React.createClass({
	render() {
		return (
			<SingleSelect>
				<Placeholder>Select Color</Placeholder>
				<Option isDisabled>Red</Option>
				<Option>Green</Option>
				<Option isDisabled>Blue</Option>
			</SingleSelect>
		);
	}
});
