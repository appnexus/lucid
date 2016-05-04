import React from 'react';
import { CaretIcon } from '../../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<div>
					<CaretIcon />
				</div>
				<div>
					<CaretIcon direction='up' />
					<CaretIcon direction='down' />
					<CaretIcon direction='left' />
					<CaretIcon direction='right' />
				</div>
				<div>
					<CaretIcon direction='up' isBadge />
					<CaretIcon direction='down' isBadge />
					<CaretIcon direction='left' isBadge />
					<CaretIcon direction='right' isBadge />
				</div>
			</div>
		);
	}
});
