import React from 'react';

import LabeledRadioButton from '../LabeledRadioButton';

export default React.createClass({
	render() {
		return (
			<section>
				<span>
					<LabeledRadioButton label='String passed in as the label' />
				</span>
				<span>
					<LabeledRadioButton label={<p>HTML element passed in as the label</p>} />
				</span>
				<span>
					<LabeledRadioButton isDisabled={true} label='Disabled' />
				</span>
				<span>
					<LabeledRadioButton isSelected={true} label='Selected' />
				</span>
				<span>
					<LabeledRadioButton isDisabled={true} isSelected={true} label='Disabled & selected' />
				</span>
			</section>
		);
	}
});
