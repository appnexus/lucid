import React from 'react';
import CaretIcon from '../CaretIcon';

export default React.createClass({
	render() {
		return (
			<div>
				<div>
					<CaretIcon openIcon />
				</div>
				<div>
					<CaretIcon direction='up' openIcon />
					<CaretIcon direction='down' openIcon />
					<CaretIcon direction='left' openIcon />
					<CaretIcon direction='right' openIcon />
				</div>
				<div>
					<CaretIcon direction='up' isBadge openIcon />
					<CaretIcon direction='down' isBadge openIcon />
					<CaretIcon direction='left' isBadge openIcon />
					<CaretIcon direction='right' isBadge openIcon />
				</div>
			</div>
		);
	}
});
