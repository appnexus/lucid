import React from 'react';

import LabeledSwitch from '../LabeledSwitch';

const style = {
	marginBottom: '3px',
	marginRight: '13px'
};

export default React.createClass({
	render() {
		return (
			<section>
				<LabeledSwitch style={style}>
					<LabeledSwitch.Label>(default props)</LabeledSwitch.Label>
				</LabeledSwitch>

				<section>
					<LabeledSwitch isDisabled={true} style={style}>
						<LabeledSwitch.Label>Disabled</LabeledSwitch.Label>
					</LabeledSwitch>
					<LabeledSwitch isSelected={true} style={style}>
						<LabeledSwitch.Label>Selected</LabeledSwitch.Label>
					</LabeledSwitch>
					<LabeledSwitch isDisabled={true} isSelected={true} style={style}>
						<LabeledSwitch.Label>Disabled & selected</LabeledSwitch.Label>
					</LabeledSwitch>
				</section>
			</section>
		);
	}
});
