import React from 'react';
import createClass from 'create-react-class';
import RadioIconGroup from '../RadioIconGroup';
import ClockIcon from '../../Icon/ClockIcon/ClockIcon';
import FourSquaresIcon from '../../Icon/FourSquaresIcon/FourSquaresIcon';

export default createClass({
	render() {
		const selections = [
			{
				label: 'my label',
				icon: ClockIcon,
			},
			{
				label: 'another label',
				icon: FourSquaresIcon,
			},
		];

		return <RadioIconGroup selections={selections} />;
	},
});
