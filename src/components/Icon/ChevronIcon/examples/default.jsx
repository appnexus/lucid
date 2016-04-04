import React from 'react';
import ChevronIcon from '../ChevronIcon';

export default React.createClass({
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
				<div>
					<ChevronIcon direction='up' isBadge />
					<ChevronIcon direction='down' isBadge />
					<ChevronIcon direction='left' isBadge />
					<ChevronIcon direction='right' isBadge />
				</div>
			</div>
		);
	}
});
