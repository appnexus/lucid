import React from 'react';

import LabeledRadioButton from '../LabeledRadioButton';

const style = {
	marginRight: '5px'
};

export default React.createClass({
	render() {
		return (
			<section style={{ display: 'flex' }}>
				<LabeledRadioButton label='String passed in as the label' style={style} />
				<LabeledRadioButton label={<p>HTML element passed in as the label</p>} style={style} />
				<LabeledRadioButton isDisabled={true} label='Disabled' style={style} />
				<LabeledRadioButton isSelected={true} label='Selected' style={style} />
				<LabeledRadioButton isDisabled={true} isSelected={true} label='Disabled & selected' style={style} />
			</section>
		);
	}
});
