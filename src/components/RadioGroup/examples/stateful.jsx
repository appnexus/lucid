import React from 'react';
import RadioGroup from '../RadioGroup';
import { buildStatefulComponent } from '../../../util/state-management';

const StatefulRadioGroup = buildStatefulComponent(RadioGroup);

export default React.createClass({
	render() {
		return (
			<StatefulRadioGroup>
				<StatefulRadioGroup.RadioButton />
				<StatefulRadioGroup.RadioButton />
				<StatefulRadioGroup.RadioButton />
				<StatefulRadioGroup.RadioButton />
				<StatefulRadioGroup.RadioButton />
			</StatefulRadioGroup>
		);
	}
});
