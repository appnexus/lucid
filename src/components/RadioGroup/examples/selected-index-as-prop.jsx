import React from 'react';
import createClass from 'create-react-class';
import { RadioGroupDumb as RadioGroup } from '../../../index';

const style = {
	marginRight: '13px',
};

export default createClass({
	render() {
		return (
			<section>
				<p>
					<em>
						(Use the styles on the <code>RadioGroup</code> component to ensure
						only the radio buttons and theirs labels are clickable)
					</em>
				</p>
				<RadioGroup
					name="name"
					selectedIndex={3}
					style={{
						display: 'inline-flex',
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
			</section>
		);
	},
});
