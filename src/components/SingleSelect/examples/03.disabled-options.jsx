import React from 'react';
import createReactClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createReactClass({
	render() {
		return (
			<SingleSelect>
				<Placeholder>Select Color</Placeholder>
				<Option isDisabled>Red</Option>
				<Option>Green</Option>
				<Option isDisabled>Blue</Option>
			</SingleSelect>
		);
	},
});
