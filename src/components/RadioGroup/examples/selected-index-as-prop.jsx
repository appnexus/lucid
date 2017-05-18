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
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Captain America</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Iron Man</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Thor</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Hulk</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Black Widow</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Hawkeye</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>
		);
	},
});
