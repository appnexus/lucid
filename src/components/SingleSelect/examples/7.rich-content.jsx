import React from 'react';
import SingleSelectStateless from '../SingleSelect';
import { buildStatefulComponent } from '../../../util/state-management';
import PlusIcon from '../../Icon/PlusIcon/PlusIcon';

const SingleSelect = buildStatefulComponent(SingleSelectStateless);
const {
	Placeholder,
	Option
} = SingleSelect;

export default React.createClass({
	render() {
		return (
			<section style={{ minHeight:90 }}>
				<SingleSelect>
					<Placeholder><PlusIcon isBadge style={{ backgroundColor:'gray', marginRight:4 }} /> Add Color</Placeholder>
					<Option><PlusIcon isBadge style={{ backgroundColor:'red', marginRight:4 }} /> Red</Option>
					<Option><PlusIcon isBadge style={{ backgroundColor:'green', marginRight:4 }} /> Green</Option>
					<Option><PlusIcon isBadge style={{ backgroundColor:'blue', marginRight:4 }} /> Blue</Option>
				</SingleSelect>
			</section>
		);
	}
});
