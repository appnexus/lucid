import React from 'react';
import createClass from 'create-react-class';
import { CheckboxLabeled } from '../../../index';

const style = {
	marginRight: '5px',
};

export default createClass({
	render() {
		return (
			<section>
				<section
					style={{
						display: 'inline-flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
					}}
				>
					<CheckboxLabeled Label='Just text' style={style} />
					<CheckboxLabeled Label={<span>HTML element</span>} style={style} />
					<CheckboxLabeled
						Label={
							[
								'Text in an array',
								'Only the first value in the array is used',
								'The rest of these should be ignored',
							] as any
						}
						style={style}
					/>
					<CheckboxLabeled
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
