import React from 'react';
import createClass from 'create-react-class';
import { EligibilityLightIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<EligibilityLightIcon isClickable />
				</div>
				<div>
					<EligibilityLightIcon isClickable eligibility='both' />
					<EligibilityLightIcon isClickable eligibility='neither' />
					<EligibilityLightIcon isClickable eligibility='left' />
					<EligibilityLightIcon isClickable eligibility='right' />
				</div>
				<div>
					<EligibilityLightIcon isClickable eligibility='both' isBadge />
					<EligibilityLightIcon isClickable eligibility='neither' isBadge />
					<EligibilityLightIcon isClickable eligibility='left' isBadge />
					<EligibilityLightIcon isClickable eligibility='right' isBadge />
				</div>
			</div>
		);
	},
});
