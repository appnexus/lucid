import React from 'react';

import LabeledRadioButton from '../LabeledRadioButton';

const style = {
	marginBottom: '3px'
};

export default React.createClass({
	render() {
		return (
			<section>
				<section>
					<LabeledRadioButton style={style}>
						<LabeledRadioButton.Label>Just text</LabeledRadioButton.Label>
					</LabeledRadioButton>
					<LabeledRadioButton style={style}>
						<LabeledRadioButton.Label>
							<span>HTML element</span>
						</LabeledRadioButton.Label>
					</LabeledRadioButton>
				</section>
			</section>
		);
	}
});
