import React from 'react';
import createClass from 'create-react-class';
import { EligibilityIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<EligibilityIcon />
				</div>
				<div>
					<EligibilityIcon eligibility='both' />
					<EligibilityIcon eligibility='neither' />
					<EligibilityIcon eligibility='left' />
					<EligibilityIcon eligibility='right' />
				</div>
				<div>
					<EligibilityIcon eligibility='both' isDisabled />
					<EligibilityIcon eligibility='neither' isDisabled />
					<EligibilityIcon eligibility='left' isDisabled />
					<EligibilityIcon eligibility='right' isDisabled />
				</div>
			</div>
		);
	},
});
