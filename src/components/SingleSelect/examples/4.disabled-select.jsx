import React from 'react';
import { SingleSelect } from '../../../index';

const {
	Placeholder,
	Option
} = SingleSelect;

export default React.createClass({
	render() {
		return (
			<SingleSelect isDisabled>
				<Placeholder>Select Color</Placeholder>
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</SingleSelect>
		);
	}
});
