import React from 'react';
import createClass from 'create-react-class';
import { SwitchLabeled } from '../../../index';

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
					<SwitchLabeled Label='Just text' style={style} />
					<SwitchLabeled Label={<span>HTML element</span>} style={style} />
					<SwitchLabeled
						Label={[
							'Text in an array',
							'Only the first value in the array is used',
							'The rest of these should be ignored',
						]}
						style={style}
					/>
					<SwitchLabeled
						Label={[
							<span key='1'>HTML element in an array</span>,
							<span key='2'>
								Again only the first value in the array is used
							</span>,
							<span key='3'>The rest should not be rendered</span>,
						]}
						style={style}
					/>
				</section>
			</section>
		);
	},
});
