import React, { useState } from 'react';
import { MinusCircleLightIcon } from '../../../../index';

export default () => {
	const [iconIsActive, setIconIsActive] = useState(true);
	return (
		<>
			<MinusCircleLightIcon />
			<MinusCircleLightIcon isClickable />
			<MinusCircleLightIcon isClickable isDisabled />
			<MinusCircleLightIcon isActive />
			<MinusCircleLightIcon isClickable isActive />
			<MinusCircleLightIcon isClickable isActive isDisabled />
			<MinusCircleLightIcon
				onClick={() => setIconIsActive(!iconIsActive)}
				isClickable
				isActive={iconIsActive}
			/>
		</>
	);
};
