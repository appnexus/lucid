import React from 'react';
import createClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	render() {
		return (
			<SingleSelect isDisabled>
				<Placeholder>Select Color</Placeholder>
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</SingleSelect>
		);
	},
});
