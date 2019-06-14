import React from 'react';
import { SuccessLightIcon } from '../../../../index';

export default () => (
	<>
		<SuccessLightIcon />
		<SuccessLightIcon isClickable />
		<SuccessLightIcon isClickable isDisabled />
		<SuccessLightIcon isActive />
		<SuccessLightIcon isClickable isActive />
		<SuccessLightIcon isClickable isActive isDisabled />
	</>
);
