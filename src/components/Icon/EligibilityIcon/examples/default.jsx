import React from 'react';
import EligibilityIcon from '../EligibilityIcon';

export default React.createClass({
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
					<EligibilityIcon eligibility='both' badge />
					<EligibilityIcon eligibility='neither' badge />
					<EligibilityIcon eligibility='left' badge />
					<EligibilityIcon eligibility='right' badge />
				</div>
			</div>
		);
	}
});
