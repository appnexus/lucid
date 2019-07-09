import React from 'react';
import createClass from 'create-react-class';
import { Validation, TextField } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<p>Text field with error (method 1)</p>
				<Validation Error='Error One'>
					<TextField value='Text Field Text' />
				</Validation>

				<br />

				<p>Text field with error (method 2)</p>
				<Validation>
					<Validation.Error>
						<span>Error Two</span>
					</Validation.Error>
					<TextField value='Text Field Text' />
				</Validation>

				<br />

				<p>Text area with error (method 1)</p>
				<Validation Error='Error Three'>
					<TextField isMultiLine row={3} value='Text Area Text' />
				</Validation>

				<br />

				<p>Text area with error (method 2)</p>
				<Validation>
					<Validation.Error>
						<span>Error Four</span>
					</Validation.Error>
					<TextField isMultiLine row={3} value='Text Area Text' />
				</Validation>
			</div>
		);
	},
});
