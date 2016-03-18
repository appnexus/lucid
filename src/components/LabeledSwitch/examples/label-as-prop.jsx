import React from 'react';

import LabeledSwitch from '../LabeledSwitch';

const style = {
	marginRight: '5px'
};

export default React.createClass({
	render() {
		return (
			<section>
				<section>
					<LabeledSwitch
							Label='Just text'
							style={style}
					/>
					<LabeledSwitch
							Label={<span>HTML element</span>}
							style={style}
					/>
					<LabeledSwitch
							Label={[
								'Text in an array',
								'Only the first value in the array is used',
								'The rest of these should be ignored'
							]}
							style={style}
					/>
					<LabeledSwitch
							Label={[
								<span>HTML element in an array</span>,
								<span>Again only the first value in the array is used</span>,
								<span>The rest should not be rendered</span>
							]}
							style={style}
					/>
				</section>
			</section>
		);
	}
});
