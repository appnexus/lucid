import React from 'react';
import { SingleSelect } from '../../../index';

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
