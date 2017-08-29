import React from 'react';
import createReactClass from 'create-react-class';
import { RadioGroup } from '../../../index';

const style = {
	marginRight: '13px',
};

export default createReactClass({
	render() {
		return (
			<RadioGroup>
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
