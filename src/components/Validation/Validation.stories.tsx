import React from 'react';
import { Meta, Story } from '@storybook/react';

import Validation, { IValidationProps } from './Validation';
import TextField from '../TextField/TextField';

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

/* Basic */
export const Basic: Story<IValidationProps> = (args) => {
	return (
		<section>
			<p>Text field with Error prop (Method 1)</p>
			<Validation {...args} Error='Error One'>
				<TextField value='Text Field Text' />
			</Validation>

			<br />

			<p>Text field with Validation Error child component (Method 2)</p>
			<Validation {...args}>
				<Validation.Error>
					<span>Error Two</span>
				</Validation.Error>
				<TextField value='Text Field Text' />
			</Validation>

			<br />

			<p>Text area with Error prop (Method 1)</p>
			<Validation {...args} Error='Error Three'>
				<TextField isMultiLine rows={3} value='Text Area Text' />
			</Validation>

			<br />

			<p>Text area with Validation Error child component (Method 2)</p>
			<Validation {...args} Error='Error FOUR TEST'>
				<Validation.Error>
					<span>Error Four</span>
				</Validation.Error>
				<TextField isMultiLine rows={3} value='Text Area Text' />
			</Validation>
		</section>
	);
};
