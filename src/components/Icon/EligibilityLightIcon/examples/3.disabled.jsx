import React from 'react';
import createClass from 'create-react-class';
import { EligibilityLightIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<EligibilityLightIcon isDisabled />
				</div>
				<div>
					<EligibilityLightIcon isDisabled eligibility='both' />
					<EligibilityLightIcon isDisabled eligibility='neither' />
					<EligibilityLightIcon isDisabled eligibility='left' />
					<EligibilityLightIcon isDisabled eligibility='right' />
				</div>
				<div>
					<EligibilityLightIcon isDisabled eligibility='both' isBadge />
					<EligibilityLightIcon isDisabled eligibility='neither' isBadge />
					<EligibilityLightIcon isDisabled eligibility='left' isBadge />
					<EligibilityLightIcon isDisabled eligibility='right' isBadge />
				</div>
			</div>
		);
	},
});
