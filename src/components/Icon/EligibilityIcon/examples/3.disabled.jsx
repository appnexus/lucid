import React from 'react';
import createClass from 'create-react-class';
import { EligibilityIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<EligibilityIcon isDisabled />
				</div>
				<div>
					<EligibilityIcon isDisabled eligibility="both" />
					<EligibilityIcon isDisabled eligibility="neither" />
					<EligibilityIcon isDisabled eligibility="left" />
					<EligibilityIcon isDisabled eligibility="right" />
				</div>
				<div>
					<EligibilityIcon isDisabled eligibility="both" isBadge />
					<EligibilityIcon isDisabled eligibility="neither" isBadge />
					<EligibilityIcon isDisabled eligibility="left" isBadge />
					<EligibilityIcon isDisabled eligibility="right" isBadge />
				</div>
			</div>
		);
	},
});
