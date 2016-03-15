import React from 'react';

import LabeledCheckbox from '../LabeledCheckbox';

const style = {
	marginBottom: '3px',
	marginRight: '13px'
};

export default React.createClass({
	render() {
		return (
			<section>
				<LabeledCheckbox style={style}>
					<LabeledCheckbox.Label>(default props)</LabeledCheckbox.Label>
				</LabeledCheckbox>

				<section style={{ display: 'flex' }}>
					<LabeledCheckbox isDisabled={true} style={style}>
						<LabeledCheckbox.Label>Disabled</LabeledCheckbox.Label>
					</LabeledCheckbox>
					<LabeledCheckbox isSelected={true} style={style}>
						<LabeledCheckbox.Label>Selected</LabeledCheckbox.Label>
					</LabeledCheckbox>
					<LabeledCheckbox isDisabled={true} isSelected={true} style={style}>
						<LabeledCheckbox.Label>Disabled & selected</LabeledCheckbox.Label>
					</LabeledCheckbox>
				</section>
			</section>
		);
	}
});
