import React from 'react';
import { Icon } from '../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<Icon>
					<rect width='10' height='10' stroke='black' strokeWidth='1' fill='red' />
				</Icon>
				<Icon isBadge>
					<rect width='10' height='10' stroke='black' strokeWidth='1' fill='red' />
				</Icon>
			</div>
		);
	},
});
