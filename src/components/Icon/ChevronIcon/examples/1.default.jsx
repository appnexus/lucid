import React from 'react';
import createClass from 'create-react-class';
import { ChevronIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<ChevronIcon />
				</div>
				<div>
					<ChevronIcon direction='up' />
					<ChevronIcon direction='down' />
					<ChevronIcon direction='left' />
					<ChevronIcon direction='right' />
				</div>
			</div>
		);
	},
});
