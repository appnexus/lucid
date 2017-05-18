import React from 'react';
import createClass from 'create-react-class';
import { Switch } from '../../../index';

export default createClass({
	render() {
		return (
			<ul>
				<li>
					<label>Unselected</label>
					<Switch tabIndex={20} />
				</li>
				<li>
					<label>Selected</label>
					<Switch isSelected={true} tabIndex={21} />
				</li>
				<li>
					<label>Disabled</label>
					<Switch isDisabled={true} tabIndex={22} />
				</li>
				<li>
					<label>Disabled & selected</label>
					<Switch isDisabled={true} isSelected={true} tabIndex={23} />
				</li>
			</ul>
		);
	},
});
