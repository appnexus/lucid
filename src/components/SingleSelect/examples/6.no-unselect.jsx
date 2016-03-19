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
			<SingleSelect allowUnselect={false}>
				<Placeholder>Select Foo</Placeholder>
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</SingleSelect>
		);
	}
});
