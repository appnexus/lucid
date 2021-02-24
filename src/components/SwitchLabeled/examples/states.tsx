import React from 'react';
import createClass from 'create-react-class';
import { SwitchLabeled } from '../../../index';

const style = {
	marginBottom: '3px',
	marginRight: '13px',
};

export default createClass({
	render() {
		return (
			<section
				style={{
					display: 'inline-flex',
					flexDirection: 'column',
					alignItems: 'flex-start',
				}}
			>
				<SwitchLabeled style={style}>
					<SwitchLabeled.Label>(default props)</SwitchLabeled.Label>
				</SwitchLabeled>

				<section>
					<SwitchLabeled isSelected={true} style={style}>
						<SwitchLabeled.Label>Selected</SwitchLabeled.Label>
					</SwitchLabeled>
					<SwitchLabeled isDisabled={true} style={style}>
						<SwitchLabeled.Label>Disabled</SwitchLabeled.Label>
					</SwitchLabeled>
					<SwitchLabeled isDisabled={true} isSelected={true} style={style}>
						<SwitchLabeled.Label>Disabled & selected</SwitchLabeled.Label>
					</SwitchLabeled>
				</section>
			</section>
		);
	},
});
