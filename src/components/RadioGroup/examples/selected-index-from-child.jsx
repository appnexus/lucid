import React from 'react';
import createClass from 'create-react-class';
import { RadioGroupDumb as RadioGroup } from '../../../index';

const style = {
	marginRight: '13px',
};

export default createClass({
	render() {
		return (
			<RadioGroup
				name="name"
				selectedIndex={3}
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<RadioGroup.RadioButton isSelected={true} style={style}>
					<RadioGroup.Label>Leonardo</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton isSelected={true} style={style}>
					<RadioGroup.Label>Raphael</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton isSelected={true} style={style}>
					<RadioGroup.Label>Donatello</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Michelangelo</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Venus</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>
		);
	},
});
