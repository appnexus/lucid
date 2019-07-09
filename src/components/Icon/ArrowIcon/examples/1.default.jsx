import React from 'react';
import createClass from 'create-react-class';
import { ArrowIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<ArrowIcon />
				</div>
				<div>
					<ArrowIcon direction='up' />
					<ArrowIcon direction='down' />
					<ArrowIcon direction='right' />
					<ArrowIcon direction='left' />
				</div>
			</div>
		);
	},
});
