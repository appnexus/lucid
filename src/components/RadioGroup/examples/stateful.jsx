import React from 'react';
import { RadioGroup } from '../../../index';

const style = {
	marginRight: '13px',
};

export default React.createClass({
	render() {
		return (
			<RadioGroup name='name'>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Alvin</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Simon</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton style={style}>
					<RadioGroup.Label>Theodore</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>
		);
	},
});
