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
					<RadioButtonLabeled Label="Just text" style={style} />
					<RadioButtonLabeled Label={<span>HTML element</span>} style={style} />
					<RadioButtonLabeled
						Label={[
							'Text in an array',
							'Only the first value in the array is used',
							'The rest of these should be ignored',
						]}
						style={style}
					/>
					<RadioButtonLabeled
						Label={[
							<span>HTML element in an array</span>,
							<span>Again only the first value in the array is used</span>,
							<span>The rest should not be rendered</span>,
						]}
						style={style}
					/>
				</section>
			</section>
		);
	},
});
