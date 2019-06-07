import React from 'react';
import { QuestionMarkIcon } from '../../../../index';

export default () => (
	<div>
		<QuestionMarkIcon />
		<br />
		<QuestionMarkIcon isClickable />
		<br />
		<QuestionMarkIcon size={100} isDisabled />
	</div>
);
