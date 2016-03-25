import React from 'react';
import RadioGroup from '../RadioGroup';

const style = {
	marginRight: '13px'
};

export default React.createClass({
	render() {
		return (
			<RadioGroup
					selectedIndex={3}
					style={{
						display: 'flex',
						flexDirection: 'column'
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
	}
});
