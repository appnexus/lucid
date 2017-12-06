import React from 'react';
import createClass from 'create-react-class';
import IconBox from '../IconBox';
import ClockIcon from '../../Icon/ClockIcon/ClockIcon';

export default createClass({
	render() {
		return <IconBox Icon={ClockIcon} Label="My IconBox" isCheckbox={true} />;
	},
});
