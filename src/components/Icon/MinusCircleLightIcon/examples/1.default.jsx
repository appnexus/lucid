import React from 'react';
import { MinusCircleLightIcon } from '../../../../index';

export default () => (
	<>
		<MinusCircleLightIcon />
		<MinusCircleLightIcon isClickable />
		<MinusCircleLightIcon isClickable isDisabled />
		<MinusCircleLightIcon isActive />
		<MinusCircleLightIcon isClickable isActive />
		<MinusCircleLightIcon isClickable isActive isDisabled />
	</>
);
