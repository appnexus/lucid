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
					<RadioButtonLabeled Label='Just text' style={style} />
					<RadioButtonLabeled Label={<span>HTML element</span>} style={style} />
					<RadioButtonLabeled
						Label={
							[
								'Text in an array',
								'Only the first value in the array is used',
								'The rest of these should be ignored',
							] as any
						}
						style={style}
					/>
					<RadioButtonLabeled
						Label={
							[
								<span key='1'>HTML element in an array</span>,
								<span key='2'>
									Again only the first value in the array is used
								</span>,
								<span key='3'>The rest should not be rendered</span>,
							] as any
						}
						style={style}
					/>
				</section>
			</section>
		);
	},
});
