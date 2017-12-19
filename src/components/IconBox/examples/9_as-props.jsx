import React from 'react';
import createClass from 'create-react-class';
import { IconBox, ClockIcon } from '../../../index';

export default createClass({
	render() {
		return <IconBox Icon={<ClockIcon />} children="As Props" kind="checkbox" />;
	},
});
