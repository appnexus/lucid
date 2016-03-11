import React from 'react';

import LabeledRadioButton from '../LabeledRadioButton';

const style = {
	marginRight: '5px'
};

export default React.createClass({
	render() {
		return (
			<section style={{ display: 'flex' }}>
				<LabeledRadioButton style={style} />
				<LabeledRadioButton Label='String passed in as the label' style={style} />
				<LabeledRadioButton Label={<p>HTML element passed in as the label</p>} style={style} />
				<LabeledRadioButton Label={[
					'First in an array passed in as the label', 
					'Second in an array passed in as the label',
					'Third in an array passed in as the label'
				]} style={style} />
				<LabeledRadioButton isDisabled={true} Label='Disabled' style={style} />
				<LabeledRadioButton isSelected={true} Label='Selected' style={style} />
				<LabeledRadioButton isDisabled={true} isSelected={true} Label='Disabled & selected' style={style} />
			</section>
		);
	}
});
