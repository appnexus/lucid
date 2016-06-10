import React from 'react';
import { SingleSelect } from '../../../index';

const {
	Option,
} = SingleSelect;

export default React.createClass({
	render() {
		return (
			<section style={{ minHeight:90 }}>
				<SingleSelect selectedIndex={1} isDisabled>
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</SingleSelect>
			</section>
		);
	},
});
