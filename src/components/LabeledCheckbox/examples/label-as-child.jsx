import React from 'react';
import { LabeledCheckbox } from '../../../index';

const style = {
	marginBottom: '3px'
};

export default React.createClass({
	render() {
		return (
			<section>
				<section>
					<LabeledCheckbox style={style}>
						<LabeledCheckbox.Label>Just text</LabeledCheckbox.Label>
					</LabeledCheckbox>
					<LabeledCheckbox style={style}>
						<LabeledCheckbox.Label>
							<span>HTML element</span>
						</LabeledCheckbox.Label>
					</LabeledCheckbox>
				</section>
			</section>
		);
	}
});
