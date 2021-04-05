import React from 'react';

import { TextFieldPlain } from '../../../index';

const style = {
	marginBottom: '10px',
};

export default function TextFieldPlainExample() {
	return (
		<div>
			<TextFieldPlain style={style} placeholder='Plain Textfield example' />
			<TextFieldPlain
				isMultiLine
				rows={5}
				style={style}
				placeholder='Plain Textfield multiline example'
			/>
		</div>
	);
}
