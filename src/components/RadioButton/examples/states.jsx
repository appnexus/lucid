import React from 'react';
import createClass from 'create-react-class';
import { RadioButton } from '../../../index';

export default createClass({
	render() {
		return (
			<ul>
				<li>
					<label>Unselected</label>
					<RadioButton tabIndex={20} />
				</li>
				<li>
					<label>Selected</label>
					<RadioButton isSelected={true} tabIndex={21} />
				</li>
				<li>
					<label>Disabled</label>
					<RadioButton isDisabled={true} tabIndex={22} />
				</li>
				<li>
					<label>Disabled & selected</label>
					<RadioButton isDisabled={true} isSelected={true} tabIndex={23} />
				</li>
			</ul>
		);
	},
});
