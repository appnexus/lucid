import React from 'react';
//import createClass from 'create-react-class';
import { Meta, Story } from '@storybook/react';

import { Validation, TextField } from './../../index';
import { IValidationProps } from './Validation';

export default {
	title: 'Helpers/Validation',
	component: Validation,
	parameters: {
		docs: {
			description: {
				component: Validation.peek.description,
			},
		},
	},
} as Meta;

/* Default */
export const Default: Story<IValidationProps> = (args) => {
	return (
		<div>
			<p>Text field with error (method 1)</p>
			<Validation {...args} Error='Error One'>
				<TextField value='Text Field Text' />
			</Validation>

			<br />

			<p>Text field with error (method 2)</p>
			<Validation {...args}>
				<Validation.Error>
					<span>Error Two</span>
				</Validation.Error>
				<TextField value='Text Field Text' />
			</Validation>

			<br />

			<p>Text area with error (method 1)</p>
			<Validation {...args} Error='Error Three'>
				<TextField isMultiLine rows={3} value='Text Area Text' />
			</Validation>

			<br />

			<p>Text area with error (method 2)</p>
			<Validation {...args}>
				<Validation.Error>
					<span>Error Four</span>
				</Validation.Error>
				<TextField isMultiLine rows={3} value='Text Area Text' />
			</Validation>
		</div>
	);
};
Default.storyName = 'Default';
