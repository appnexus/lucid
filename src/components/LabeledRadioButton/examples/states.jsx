import React from 'react';

import LabeledRadioButton from '../LabeledRadioButton';

const style = {
	marginBottom: '3px',
	marginRight: '13px'
};

export default React.createClass({
	render() {
		return (
			<section>
				<LabeledRadioButton style={style}>
					<LabeledRadioButton.Label>(default props)</LabeledRadioButton.Label>
				</LabeledRadioButton>

				<section style={{ display: 'flex' }}>
					<LabeledRadioButton isDisabled={true} style={style}>
						<LabeledRadioButton.Label>Disabled</LabeledRadioButton.Label>
					</LabeledRadioButton>
					<LabeledRadioButton isSelected={true} style={style}>
						<LabeledRadioButton.Label>Selected</LabeledRadioButton.Label>
					</LabeledRadioButton>
					<LabeledRadioButton isDisabled={true} isSelected={true} style={style}>
						<LabeledRadioButton.Label>Disabled & selected</LabeledRadioButton.Label>
					</LabeledRadioButton>
				</section>
			</section>
		);
	}
});
