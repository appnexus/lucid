import React from 'react';
import createClass from 'create-react-class';
import { RadioButtonLabeled } from '../../../index';

const style = {
	marginBottom: '3px',
	marginRight: '13px',
};

export default createClass({
	render() {
		return (
			<section>
				<RadioButtonLabeled style={style}>
					<RadioButtonLabeled.Label>(default props)</RadioButtonLabeled.Label>
				</RadioButtonLabeled>

				<section style={{ display: 'flex' }}>
					<RadioButtonLabeled isDisabled={true} style={style}>
						<RadioButtonLabeled.Label>Disabled</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled isSelected={true} style={style}>
						<RadioButtonLabeled.Label>Selected</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled isDisabled={true} isSelected={true} style={style}>
						<RadioButtonLabeled.Label>
							Disabled & selected
						</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
				</section>
			</section>
		);
	},
});
