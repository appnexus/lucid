import React from 'react';
import RadioGroup from '../RadioGroup';
import { buildStatefulComponent } from '../../../util/state-management';

const style = {
	marginRight: '13px'
};

const StatefulRadioGroup = buildStatefulComponent(RadioGroup);

export default React.createClass({
	render() {
		return (
			<StatefulRadioGroup>
				<StatefulRadioGroup.RadioButton style={style}>
					<StatefulRadioGroup.Label>Alvin</StatefulRadioGroup.Label>
				</StatefulRadioGroup.RadioButton>
				<StatefulRadioGroup.RadioButton style={style}>
					<StatefulRadioGroup.Label>Simon</StatefulRadioGroup.Label>
				</StatefulRadioGroup.RadioButton>
				<StatefulRadioGroup.RadioButton style={style}>
					<StatefulRadioGroup.Label>Theodore</StatefulRadioGroup.Label>
				</StatefulRadioGroup.RadioButton>
			</StatefulRadioGroup>
		);
	}
});
