import React from 'react';
import RadioGroup from '../RadioGroup';
import { buildStatefulComponent } from '../../../util/state-management';

const StatefulRadioGroup = buildStatefulComponent(RadioGroup);

export default React.createClass({
	render() {
		return (
			<StatefulRadioGroup>
				<StatefulRadioGroup.RadioButton>
					<StatefulRadioGroup.Label>Alvin</StatefulRadioGroup.Label>
				</StatefulRadioGroup.RadioButton>
				<StatefulRadioGroup.RadioButton>
					<StatefulRadioGroup.Label>Simon</StatefulRadioGroup.Label>
				</StatefulRadioGroup.RadioButton>
				<StatefulRadioGroup.RadioButton>
					<StatefulRadioGroup.Label>Theodore</StatefulRadioGroup.Label>
				</StatefulRadioGroup.RadioButton>
			</StatefulRadioGroup>
		);
	}
});
