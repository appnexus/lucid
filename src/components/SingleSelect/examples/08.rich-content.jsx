import React from 'react';
import createClass from 'create-react-class';
import { SuccessIcon, SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	render() {
		return (
			<SingleSelect>
				<Placeholder>
					<SuccessIcon style={{ marginRight: 4 }} /> Add Color
				</Placeholder>
				<Option>
					<SuccessIcon style={{ marginRight: 4 }} /> Red
				</Option>
				<Option>
					<SuccessIcon style={{ marginRight: 4 }} /> Green
				</Option>
				<Option>
					<SuccessIcon style={{ marginRight: 4 }} /> Blue
				</Option>
			</SingleSelect>
		);
	},
});
