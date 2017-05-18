import React from 'react';
import createClass from 'create-react-class';
import { EligibilityIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<EligibilityIcon isClickable />
				</div>
				<div>
					<EligibilityIcon isClickable eligibility="both" />
					<EligibilityIcon isClickable eligibility="neither" />
					<EligibilityIcon isClickable eligibility="left" />
					<EligibilityIcon isClickable eligibility="right" />
				</div>
				<div>
					<EligibilityIcon isClickable eligibility="both" isBadge />
					<EligibilityIcon isClickable eligibility="neither" isBadge />
					<EligibilityIcon isClickable eligibility="left" isBadge />
					<EligibilityIcon isClickable eligibility="right" isBadge />
				</div>
			</div>
		);
	},
});
