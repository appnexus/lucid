import React, { useState } from 'react';
import { SuccessLightIcon } from '../../../../index';

export default () => {
	const [iconIsActive, setIconIsActive] = useState(true);
	return (
		<>
			<SuccessLightIcon />
			<SuccessLightIcon isClickable />
			<SuccessLightIcon isClickable isDisabled />
			<SuccessLightIcon isActive />
			<SuccessLightIcon isDisabled />
			<SuccessLightIcon isClickable isActive />
			<SuccessLightIcon isClickable isActive isDisabled />
			<SuccessLightIcon
				onClick={() => setIconIsActive(!iconIsActive)}
				isClickable
				isActive={iconIsActive}
			/>
		</>
	);
};
