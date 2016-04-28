import React from 'react';
import { SingleSelect } from '../../../index';

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
