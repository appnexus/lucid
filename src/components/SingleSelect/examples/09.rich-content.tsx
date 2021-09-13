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

// begin-hide-from-docs
export let notes = `
This allows you to include rich content in the dropdown. Use this where an image will help users make a selection, for example a company logo near the company name.
`;
// end-hide-from-docs
