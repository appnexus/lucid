import React from 'react';
import createReactClass from 'create-react-class';
import { CheckboxLabeled } from '../../../index';

const style = {
	marginBottom: '3px',
};

export default createReactClass({
	render() {
		return (
			<section>
				<section>
					<CheckboxLabeled style={style}>
						<CheckboxLabeled.Label>Just text</CheckboxLabeled.Label>
					</CheckboxLabeled>
					<CheckboxLabeled style={style}>
						<CheckboxLabeled.Label>
							<span>HTML element</span>
						</CheckboxLabeled.Label>
					</CheckboxLabeled>
				</section>
			</section>
		);
	},
});
