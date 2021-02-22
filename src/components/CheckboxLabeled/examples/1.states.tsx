import React from 'react';
import createClass from 'create-react-class';
import { CheckboxLabeled } from '../../../index';

const style = {
	marginBottom: '3px',
	marginRight: '13px',
};

export default createClass({
	render() {
		return (
			<section>
				<CheckboxLabeled style={style}>
					<CheckboxLabeled.Label>(default props)</CheckboxLabeled.Label>
				</CheckboxLabeled>

				<section style={{ display: 'flex' }}>
					<CheckboxLabeled isDisabled={true} style={style}>
						<CheckboxLabeled.Label>Disabled</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled isSelected={true} style={style}>
						<CheckboxLabeled.Label>Selected</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled isDisabled={true} isSelected={true} style={style}>
						<CheckboxLabeled.Label>Disabled & selected</CheckboxLabeled.Label>
					</CheckboxLabeled>
				</section>
			</section>
		);
	},
});
