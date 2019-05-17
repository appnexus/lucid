import React from 'react';
import createClass from 'create-react-class';
import { PlusIcon, SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	render() {
		return (
			<SingleSelect>
				<Placeholder>
					<PlusIcon style={{ backgroundColor: 'gray', marginRight: 4 }} /> Add
					Color
				</Placeholder>
				<Option>
					<PlusIcon style={{ backgroundColor: 'red', marginRight: 4 }} /> Red
				</Option>
				<Option>
					<PlusIcon style={{ backgroundColor: 'green', marginRight: 4 }} />{' '}
					Green
				</Option>
				<Option>
					<PlusIcon style={{ backgroundColor: 'blue', marginRight: 4 }} /> Blue
				</Option>
			</SingleSelect>
		);
	},
});
