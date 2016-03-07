import React from 'react';
import RadioGroup from '../RadioGroup';

export default React.createClass({
	render() {
		return (
			<div>
				<h5>Default</h5>
				<RadioGroup>
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
				</RadioGroup>

				<h5>`selectedIndex` prop</h5>
				<RadioGroup selectedIndex={3}>
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
				</RadioGroup>

				<h5>`selectedIndex` prop overridden by index of last child with `isSelected` prop</h5>
				<RadioGroup selectedIndex={3}>
					<RadioGroup.RadioButton isSelected={true} />
					<RadioGroup.RadioButton isSelected={true} />
					<RadioGroup.RadioButton isSelected={true} />
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
				</RadioGroup>
			</div>
		);
	}
});
