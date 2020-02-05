import React from 'react';
import createClass from 'create-react-class';
import { RadioButton } from '../../../index';

const style = {
	display: 'flex',
	alignItems: 'center',
};

export default createClass({
	render() {
		return (
			<ul>
				<li style={style}>
					<label>Unselected</label>
					<RadioButton tabIndex={20} />
				</li>
				<li style={style}>
					<label>Selected</label>
					<RadioButton isSelected={true} tabIndex={21} />
				</li>
				<li style={style}>
					<label>Disabled</label>
					<RadioButton isDisabled={true} tabIndex={22} />
				</li>
				<li style={style}>
					<label>Disabled & selected</label>
					<RadioButton isDisabled={true} isSelected={true} tabIndex={23} />
				</li>
			</ul>
		);
	},
});
