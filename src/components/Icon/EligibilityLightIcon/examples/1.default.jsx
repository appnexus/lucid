import React from 'react';
import createClass from 'create-react-class';
import { EligibilityLightIcon } from '../../../../index';

export default createClass({
	render() {
		return (
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
					<EligibilityLightIcon eligibility='both' isBadge />
					<EligibilityLightIcon eligibility='neither' isBadge />
					<EligibilityLightIcon eligibility='left' isBadge />
					<EligibilityLightIcon eligibility='right' isBadge />
				</div>
			</div>
		);
	},
});
