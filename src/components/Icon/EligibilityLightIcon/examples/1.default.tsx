import React from 'react';
import { EligibilityLightIcon } from '../../../../index';

export default () => (
	<div>
		<div>
			<EligibilityLightIcon />
		</div>
		<div>
			<EligibilityLightIcon eligibility='both' />
			<EligibilityLightIcon eligibility='neither' />
			<EligibilityLightIcon eligibility='left' />
			<EligibilityLightIcon eligibility='right' />
		</div>
		<div>
			<EligibilityLightIcon eligibility='both' isDisabled />
			<EligibilityLightIcon eligibility='neither' isDisabled />
			<EligibilityLightIcon eligibility='left' isDisabled />
			<EligibilityLightIcon eligibility='right' isDisabled />
		</div>
	</div>
);
