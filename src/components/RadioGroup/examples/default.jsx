import React from 'react';
import createReactClass from 'create-react-class';
import { RadioGroupDumb as RadioGroup } from '../../../index';

const style = {
	marginRight: '13px',
};

export default createReactClass({
	render() {
		return (
			<RadioGroup>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Superman</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Batman</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Wonder Woman</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Aquaman</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Robin</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>
		);
	},
});
