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
							SelectedLabel='Just text'
							UnselectedLabel='Unselected (text only)'
							style={style}
					/>
					<LabeledSwitch
							SelectedLabel={<span>HTML element</span>}
							UnselectedLabel={<span>Unselected SPAN tag</span>}
							style={style}
					/>
					<LabeledSwitch
							SelectedLabel={[
								'Text in an array',
								'Only the first value in the array is used',
								'The rest of these should be ignored'
							]}
							UnselectedLabel={[
								'This is unselected',
								'This should not show up at all',
								'What a waste of a line of code!'
							]}
							style={style}
					/>
					<LabeledSwitch
							SelectedLabel={[
								<span>HTML element in an array</span>,
								<span>Again only the first value in the array is used</span>,
								<span>The rest should not be rendered</span>
							]}
							UnselectedLabel={[
								<span>Unselected HTML element wtihin an array</span>,
								<span>Will we show up?</span>,
								<span>No. No we won't.</span>
							]}
							style={style}
					/>
				</section>
			</section>
		);
	}
});
