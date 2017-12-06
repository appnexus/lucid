import React from 'react';
import createClass from 'create-react-class';
import CheckboxIconGroup from '../CheckboxIconGroup';
import ClockIcon from '../../Icon/ClockIcon/ClockIcon';
import FourSquaresIcon from '../../Icon/FourSquaresIcon/FourSquaresIcon';

export default createClass({
	render() {
		return (
			<CheckboxIconGroup
				IconBox={[
					{
						Label: 'icon stuff',
						Icon: ClockIcon,
					},
					{
						Label: 'more labels',
						Icon: FourSquaresIcon,
					},
				]}
			/>
		);
	},
});
