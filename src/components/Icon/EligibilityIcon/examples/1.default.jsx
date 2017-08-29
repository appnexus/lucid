import React from 'react';
import createReactClass from 'create-react-class';
import { EligibilityIcon } from '../../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<div>
					<EligibilityIcon />
				</div>
				<div>
					<EligibilityIcon eligibility="both" />
					<EligibilityIcon eligibility="neither" />
					<EligibilityIcon eligibility="left" />
					<EligibilityIcon eligibility="right" />
				</div>
				<div>
					<EligibilityIcon eligibility="both" isBadge />
					<EligibilityIcon eligibility="neither" isBadge />
					<EligibilityIcon eligibility="left" isBadge />
					<EligibilityIcon eligibility="right" isBadge />
				</div>
			</div>
		);
	},
});
