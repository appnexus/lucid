import React from 'react';
import createClass from 'create-react-class';
import { RadioButtonLabeled } from '../../../index';

const style = {
	marginBottom: '3px',
};

export default createClass({
	render() {
		return (
			<section>
				<section>
					<RadioButtonLabeled style={style}>
						<RadioButtonLabeled.Label>Just text</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
					<RadioButtonLabeled style={style}>
						<RadioButtonLabeled.Label>
							<span>HTML element</span>
						</RadioButtonLabeled.Label>
					</RadioButtonLabeled>
				</section>
			</section>
		);
	},
});
