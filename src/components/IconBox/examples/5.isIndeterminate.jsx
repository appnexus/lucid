import React from 'react';
import createClass from 'create-react-class';
import IconBox from '../IconBox';
import ClockIcon from '../../Icon/ClockIcon/ClockIcon';

export default createClass({
	render() {
		return (
			<IconBox
				IconComponent={ClockIcon}
				Label="My IconBox"
				isCheckbox={true}
				isIndeterminate={true}
			/>
		);
	},
});
